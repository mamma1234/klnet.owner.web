import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class nodeExpress extends Component {
    state = {
        posts: []
    };

    async componentDidMount() {
        try {
            const res = await fetch('/api/customers');
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <h3>Express Test</h3>
<Paper>                
<Table>
<TableHead>
<TableRow>
<TableCell>번호</TableCell>
<TableCell>이미지</TableCell>
<TableCell>이름</TableCell>
<TableCell>생년월일</TableCell>
<TableCell>성별</TableCell>
<TableCell>직업</TableCell>
</TableRow>
</TableHead>
<TableBody>
{this.state.posts ? this.state.posts.map(c => {
return <TableRow><TableCell>{c.id}</TableCell><TableCell>{c.title}</TableCell>
<TableCell>{c.name}</TableCell><TableCell>{c.birthday}</TableCell>
<TableCell>{c.gender}</TableCell><TableCell>{c.job}</TableCell></TableRow>
}) : ''}
</TableBody>
</Table>
</Paper>
            </div>
        );
    }
}

export default nodeExpress;