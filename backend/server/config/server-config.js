import dotenv from 'dotenv';

dotenv.config();

const sysConfig = {
    name: process.env.NAME,
    siteKey: process.env.SITE_KEY,
    secretKey: process.env.SECRET_KEY,
    uri: process.env.URI_MONGO,
    domain: process.env.DOMAIN,
    bodyParserUrlencodedLimit: process.env.BODY_PARSER_URLENCODED_LIMIT,
    bodyParserJsonLimit: process.env.BODY_PARSER_JSON_LIMIT,
    log: (env) => {
        if (env) return log[env]();
        return log['development']();
    }
};

export default sysConfig;