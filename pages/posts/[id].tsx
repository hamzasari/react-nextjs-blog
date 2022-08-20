import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import Date from '../../components/Date';

import { getAllPostIds, getPostData, PostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: { params: { id: string; }}) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

interface Props {
  postData: PostData;
}

const Post = ({ postData }: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;
