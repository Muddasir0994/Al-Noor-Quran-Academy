import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPostPage as BlogPostComp } from '../components/BlogPostPage';

interface BlogPostPageProps {
  onOpenTrial: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenTrial }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    navigate('/blog');
    return null;
  }

  return (
    <BlogPostComp
      slug={slug}
      onNavigate={(s) => navigate(`/blog/${s}`)}
      onNavigateBack={() => navigate('/blog')}
      onOpenTrial={onOpenTrial}
    />
  );
};
