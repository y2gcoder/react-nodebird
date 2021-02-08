import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';

import Head from 'next/head';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { backUrl } from '../../config/config';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  // getStaticPaths, props용
  // if (router.isFallback) {
  //   return <div>로딩중...</div>;
  // }

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : `${backUrl}/favicon.ico`} />
        <meta property="og:url" content={`${backUrl}/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

// export async function getStaticPaths() {
//   // const result = await axios.get('/post/list');
//   return {
//     paths: [
//       { params: { id: '3' } },
//       { params: { id: '4' } },
//       { params: { id: '5' } },
//     ],
//     fallback: true, 서버 사이드 렌더링 하냐 vs 그냥 에러 페이지 보내냐
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//   console.log(context);
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_POST_REQUEST,
//     data: context.params.id, // context.params나 context.query를 사용하면 useRouter에 접근 가능.
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id, // context.params나 context.query를 사용하면 useRouter에 접근 가능.
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
