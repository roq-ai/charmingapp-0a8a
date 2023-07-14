import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { customizedCakeValidationSchema } from 'validationSchema/customized-cakes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.customized_cake
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCustomizedCakeById();
    case 'PUT':
      return updateCustomizedCakeById();
    case 'DELETE':
      return deleteCustomizedCakeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCustomizedCakeById() {
    const data = await prisma.customized_cake.findFirst(convertQueryToPrismaUtil(req.query, 'customized_cake'));
    return res.status(200).json(data);
  }

  async function updateCustomizedCakeById() {
    await customizedCakeValidationSchema.validate(req.body);
    const data = await prisma.customized_cake.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCustomizedCakeById() {
    const data = await prisma.customized_cake.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
