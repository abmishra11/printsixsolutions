import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const getEmailTemplate = async (emailTemplate, variables) => {

    const templatePath = path.resolve(process.cwd(), emailTemplate);

    const emailHtml = await ejs.renderFile(templatePath, { ...variables });

    return emailHtml;
}

export default getEmailTemplate;