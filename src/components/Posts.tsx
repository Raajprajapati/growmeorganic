import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const Posts: React.FC = () => {

    interface Post {
        id: number,
        userId: number,
        title: string,
        completed: boolean,
    }

    const [posts, setPosts] = useState<Post[]>([]);

    const columns: GridColDef[] = [
        { 
            field: 'id',
            headerName: 'ID',
            width: 90 
        },
        {
            field: 'userId',
            headerName: 'User ID',
            width: 150,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 400,
        },
        {
            field: 'completed',
            headerName: 'Completed',
            type: 'string',
            width: 110,
        }
    ];


    async function fetchPosts() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Post[] = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    useEffect(() => {

        fetchPosts();

    }, []);

    return (
        <>
            <Box sx={{ height: '100%', width: '80vw' }}>
                <DataGrid
                    rows={posts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                        
                    }}
                    pageSizeOptions={[5]}  
                />
            </Box>

        </>
    )
}

export default Posts;