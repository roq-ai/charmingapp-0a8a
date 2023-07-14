import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cakeDesignValidationSchema } from 'validationSchema/cake-designs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cake_design
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCakeDesignById();
    case 'PUT':
      return updateCakeDesignById();
    case 'DELETE':
      return deleteCakeDesignById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCakeDesignById() {
    const data = await prisma.cake_design.findFirst(convertQueryToPrismaUtil(req.query, 'cake_design'));
    return res.status(200).json(data);
  }

  async function updateCakeDesignById() {
    await cakeDesignValidationSchema.validate(req.body);
    const data = await prisma.cake_design.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCakeDesignById() {
    const data = await prisma.cake_design.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
