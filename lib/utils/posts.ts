import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';

type PostsData = {
  id: string;
  description: string;
  date: Date;
  content: string;
  type: 'blog' | 'video' | 'course' | 'project';
};

export type Post = Omit<PostsData, 'date'> & {
  date: string;
};

const directory: string = path.join(process.cwd(), 'lib', 'posts');

export function getPosts(): Post[] {
  const posts: PostsData[] = [];
  const files: string[] = fs.readdirSync(directory);
  files.forEach(async (file: string) => {
    const id: string = file.replace(/\.md$/, '');
    const fullPath: string = path.join(directory, file);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    posts.push({
      id,
      description: data.description,
      date: new Date(data.date),
      type: data.type,
      content,
    });
  });
  posts.sort((a: PostsData, b: PostsData) => b.date.getTime() - a.date.getTime());
  return posts.map((post) => ({ ...post, date: post.date.toISOString() }));
}

export function getAllPostsIds(): { params: { id: string } }[] {
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostFromId(id: string): Promise<Post> {
  const fullPath: string = path.join(directory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const result = await remark().use(html, { sanitize: false }).use(remarkPrism).process(content);
  return {
    id,
    description: data.description,
    date: new Date(data.date).toISOString(),
    type: data.type,
    content: result.toString(),
  };
}
