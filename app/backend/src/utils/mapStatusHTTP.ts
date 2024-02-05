import { ServiceResponseSuccessType, ServiceResponseErrorType } from '../types/ServiceResponse';

type HTTPStatus = ServiceResponseErrorType | ServiceResponseSuccessType;

export default function mapStatusHTTP(status: HTTPStatus): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'BAD_REQUEST': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'UNPROCESSABLE_ENTITY': return 422;
    default: return 500;
  }
}
