import React from 'react';
import Helmet from 'react-helmet';

type Props = {
  title?: string;
  description?: string;
  image?: string;
}

const Seo: React.FC<Props> = ({
  title = 'Create API',
  description = "Create API's with Next.js, TypeScript, and GraphQL",
  image = 'https://nextui.org/static/images/next-logo.png',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="image" content={image} />
  </Helmet>
);

export default Seo;
