import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getSortedPostsData, PostItem } from '../lib/posts';

import Layout, { siteTitle } from '../components/Layout';
import Date from '../components/Date';

import utilStyles from '../styles/utils.module.css';

/**
 * This method runs on server side.
 * It is used only for static generation.
 *
 * Values are only calculated during build time and never changed,
 * if a user requests the page again, server only will send the pre-built html.
 */
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

/**
 * If we want to use server side rendering, we should use
 *  getServerSideProps: GetServerSideProps
 * method.
 * This is also an async function and it should be exported like getStaticProps function.
 *
 * This way, we can get values on every user request.
 *
 * This method also runs on server side.
 */

interface Props {
  allPostsData: PostItem[];
}

/**
 * Home page component
 *
 * @param {object} props props
 * @param {Array} props.allPostsData all posts data
 * @returns {JSX.Element} home page
 */
const Home = ({ allPostsData }: Props): JSX.Element => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Experienced Senior Full-Stack Software Engineer with 13+ years of
          extensive experience in the software development.
        </p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">the Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
