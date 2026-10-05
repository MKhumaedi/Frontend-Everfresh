import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOProps> = ({ title, description, ogImage }) => {
  useEffect(() => {
    const fullTitle = `${title} | EVERFRESH`;
    document.title = fullTitle;

    const defaultDesc =
      'Fabrikasi mesin es tube, flake, block direct cooling, dan cold storage industri standar internasional di Indonesia.';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || defaultDesc);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
    }
  }, [title, description, ogImage]);

  return null;
};
