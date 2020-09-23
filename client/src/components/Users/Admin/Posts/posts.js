import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../HOC/adminLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const Posts = (props) => {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/books/allbooks?owner=${props.user.userData.id}&order=asc`)
      .then((response) => {
        setPosts(response.data);
      });
  }, [props]);

  console.log(props.user.userData.id);
  console.log(posts);

  return (
    <AdminLayout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/admin/posts/edit/${item._id}`}>{item.name}</Link>
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>
                  {moment(item.createdAt).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell>{item.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
};

export default Posts;
