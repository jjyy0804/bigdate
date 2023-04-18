import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import { postList } from '../../Data';
import { HandThumbsUp,Heart, } from 'react-bootstrap-icons';

const PostList = props => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(postList);
  }, []);

  return (
    <div>
      <div className='background-container' >
        <div className='overlay-container'>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: 'large',
              marginRight: '40px',
              marginLeft: '40px',
              borderBottom: '1px solid gray',
            }}
          >
            그때 코스
          </div>

          <div>
            <>
              <CommonTable
                headersName={[
                  '글번호',
                  '제목',
                  '작성자',
                  '좋아요 수',
                  '찜 수',
                  '작성일',
                ]}
              >
                {dataList
                  ? dataList.map((item, index) => {
                      return (
                        <CommonTableRow key={index}>
                          <CommonTableColumn>{item.course_id}</CommonTableColumn>
                          <CommonTableColumn>
                            <Link to={`/postView/${item.course_id}`}>
                              {item.course_name}
                            </Link>
                          </CommonTableColumn>
                          <CommonTableColumn>{item.user_id}</CommonTableColumn>
                          <CommonTableColumn>
                            <HandThumbsUp
                              style={{ marginRight: '5px' }}
                            />
                            {item.LikeCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            <Heart style={{ marginRight: '5px' }} />
                            {item.ScrapCount}
                          </CommonTableColumn>
                          <CommonTableColumn>
                            {item.posted_date}
                          </CommonTableColumn>
                        </CommonTableRow>
                      );
                    })
                  : ''}
              </CommonTable>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
