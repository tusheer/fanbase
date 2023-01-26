import { Resolver, zodResolver } from '@hookform/resolvers/zod';
import removeNullOrEmpty from './removeNullOrEmpty';

const zodSchemaResolver: Resolver = (schema, schemaOptions, resolverOptions = {}) => {
    return (value, _, option) =>
        zodResolver(schema, schemaOptions, resolverOptions)(removeNullOrEmpty(value), _, option);
};

export default zodSchemaResolver;
