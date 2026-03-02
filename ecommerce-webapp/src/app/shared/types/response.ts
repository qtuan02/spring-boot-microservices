export type ResponsePageList<T> = {
  data: T[];
  totalElements: number;
  pageNumber: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ResponseError = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  service: string;
  timestamp: string;
  error: string;
};

export type ResponseSuccess<T> = {
  statusCode: number
  message: string
  data: T
  errorCode: number
  errorMessage: string
}
