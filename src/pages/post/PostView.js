import React, { useEffect, useState } from 'react';
import { getPostByNo } from '../../Data';
const { kakao } = window


const PostView = ({ history, location, match }) => {
  const [ data, setData ] = useState({});

  const { course_id } = match.params;

/**코스 상세 정보 조회 axio get */
/**코스 댓글 조회 axio get */

  useEffect(() => {
    setData(getPostByNo(course_id));
  }, []);
  
 

  return (
    <>
     

      <div className="post-view-wrapper">
        {
          data ? (
            <>
            <div className='background-container'>
            <div className="overlay-container">
            <div style={{
              fontWeight:"bold",
              fontSize:"large",
              marginRight:"40px",
              marginLeft:"40px",
              paddingTop:'80px',
              borderBottom: '1px solid gray'
              }}>{data.course_name}</div>

              <div  id='Mymp'>

              </div>
              <div>
                <label>게시글 번호</label>
                <label>{ data.course_id }</label>
              </div>
              <div>
                <label>제목</label>
                <label>{ data.course_name }</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{ data.user_id }</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{ data.posted_date }</label>
              </div>
              <div className="post-view-row">
                <label>좋아요 수</label>
                <label>{ data.LikeCount }</label>
              </div>
              <div className="post-view-row">
                <label>찜 수</label>
                <label>{ data.ScrapCount }</label>
              </div>
              
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {
                    data.course_info
                  }
                </div>
              </div>
              </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록으로 돌아가기</button>
      </div>
    </>
  )
}

export default PostView;