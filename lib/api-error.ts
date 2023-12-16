import { ZodIssue } from "zod";

const ERROR_CODES = [
  "internal_server_error",
  "invalid_body",
  "invalid_query",
  "invalid_password",
  "invalid_username",
  "invalid_state",
  "incorrect_username_or_password",
  "auth_invalid",
  "auth_expired",
  "auth_blocked",
  "auth_missing",
  "resource_not_found",
  "too_many_requests",
  "invalid_request",
  "incorrect_totp_token",
  "sign_up_blocked",
  "type_mismatch",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export interface APIErrorType {
  code: ErrorCode;
  statusCode: number;
  message: string;
}

export class APIError extends Error implements APIErrorType {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly message: string;
  public readonly types?: ZodIssue[];
  public readonly error: Error | undefined;

  public constructor(props: {
    code: ErrorCode;
    message: string;
    statusCode: number;
    error?: Error;
    types?: ZodIssue[];
  }) {
    super();
    this.types = props.types;
    this.code = props.code;
    this.statusCode = props.statusCode;
    this.message = props.message;
    this.error = props.error;
  }
}
