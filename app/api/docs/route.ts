import {
  ApiReference,
  ApiReferenceOptions,
} from "@scalar/nextjs-api-reference";
import { document } from "@/lib/openapi/generate";

const config: ApiReferenceOptions = {
  spec: {
    content: document,
  },
};

export const GET = ApiReference(config);
