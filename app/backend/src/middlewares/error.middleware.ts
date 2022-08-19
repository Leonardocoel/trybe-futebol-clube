import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMidleware: ErrorRequestHandler = async (error, _req, res, _next) => {
  const { name, message } = error;
  const status = Number(StatusCodes[name]);

  if (!status) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();

  res.status(status).json({ message });
};

export default errorMidleware;
