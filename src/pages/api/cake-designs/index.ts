import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { cakeDesignValidationSchema } from 'validationSchema/cake-designs';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCakeDesigns();
    case 'POST':
      return createCakeDesign();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCakeDesigns() {
    const data = await prisma.cake_design
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'cake_design'));
    return res.status(200).json(data);
  }

  async function createCakeDesign() {
    await cakeDesignValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.customized_cake?.length > 0) {
      const create_customized_cake = body.customized_cake;
      body.customized_cake = {
        create: create_customized_cake,
      };
    } else {
      delete body.customized_cake;
    }
    const data = await prisma.cake_design.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
