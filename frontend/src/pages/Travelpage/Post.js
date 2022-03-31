import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import server from '../../API/server';
import parse from 'html-react-parser';
import { Table } from 'react-bootstrap';
let postId;

function Post() {
  let params = useParams();
  let navigate = useNavigate();
  postId = params.postId;
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [createDay, setCreateDay] = useState();
  const [updateDay, setUpdateDay] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [city, setCity] = useState();
  const [newComment, setNewComment] = useState({
    content: 'string',
  });
  const deletePost = () => {
    // console.log(
    //   server.BASE_URL + server.ROUTES.getReview + postId + '/' + 'review_info/'
    // );
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

    axios
      .delete(
        server.BASE_URL +
          server.ROUTES.getReview +
          postId +
          '/' +
          'review_info/'
      )
      .then((res) => {
        if (res.status == 200) {
          alert('게시글이 삭제되었습니다.');
          navigate('/local/travelDetail/board/' + city);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('권한이 없습니다.');
      });
  };
  const deleteComment = (id) => {
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

    axios
      .delete(server.BASE_URL + server.ROUTES.comment + 'edit/' + id + '/')
      .then((res) => {
        if (res.status == 200) {
          alert('댓글이 삭제되었습니다');
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('권한이 없습니다.');
      });
  };
  const writeComment = () => {
    let temp = {
      content: newComment.content,
    };
    console.log(newComment);
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';
    axios
      // .post(server.BASE_URL + server.ROUTES.comment + params.postId, temp + '/')
      .post(
        server.BASE_URL + server.ROUTES.comment + params.postId + '/',
        newComment
      )
      .then((res) => {
        if (res.status === 201) {
          alert('댓글 작성이 완료되었습니다');
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('댓글작성에 실패했습니다.');
      });
  };
  useEffect(() => {
    //새로고침용,,,
    //게시글 요청
    axios
      .get(
        server.BASE_URL +
          server.ROUTES.getReview +
          postId +
          '/' +
          server.ROUTES.reviewInfo
      )
      .then((res) => {
        console.log(res);
        setContent(res.data.content);
        setTitle(res.data.title);
        setCreateDay(res.data.created);
        setUpdateDay(res.data.updated);
        setUser(res.data.user.username);
        setCity(res.data.city);
      });

    //댓글 요청
    axios
      .get(server.BASE_URL + server.ROUTES.comment + postId + '/')
      .then((res) => {
        console.log(res);
        setComments(res.data);
      });
  }, []);

  return (
    <div>
      <div className="content">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <h1>{title && title}</h1>
              </td>
            </tr>
            <tr>
              <td>{createDay}</td>
            </tr>

            <tr>
              <td>작성자 : {user}</td>
            </tr>
            <tr>
              <td>{content}</td>
              {/* <div>{parse(content && content)}</div> */}
            </tr>
          </tbody>
        </Table>
        <div className="btn-group btn-group-lg">
          <button type="button" className="btn btn-primary">
            수정
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deletePost();
            }}
          >
            삭제
          </button>
        </div>
      </div>
      <div className="comment">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>작성자</th>
              <th>내용</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {comments &&
              comments.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data.user.nickname}</td>
                    <td>{data.content}</td>
                    <td>{data.created}</td>
                    <td>
                      {' '}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          deleteComment(data.id);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="댓글을 입력해주세요"
            onChange={(event) => setNewComment({ content: event.target.value })}
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => {
              writeComment();
            }}
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
}
export default Post;
