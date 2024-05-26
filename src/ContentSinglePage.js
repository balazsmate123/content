import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export function ContentSinglePage() {
    const params = useParams();
    const id = params.contentId;
    const [contents, setContents] = useState([]);
    const [isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        axios.get(`https://chess.sulla.hu/chess/${id}`)
            .then((res) => res.data)
            .then((data) => setContents(data))
            .catch(console.log)
            .finally(() => {
                setPending(false);
            });
    }
        , [id]);


    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !contents.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <img alt={contents.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={contents.image_url ? contents.image_url :
                                "https://via.placeholder.com/400x800"}
                        />
                         <h5 className="card-title">Content neve: {contents.name}</h5>
                        <div className="lead">Születési dátuma: {contents.birth_date}</div>
                        <div className="lead">Content: {contents.world_ch_won}</div>
                    </div>
                    <div><NavLink to={contents.profile_url} target="_blank">{contents.profile_url}</NavLink></div><br />
                    <div><NavLink to="/"><button className='btn btn-secondary m-1'>Mégsem</button></NavLink> &nbsp;&nbsp;&nbsp;
                        <NavLink key="y" to={"/mod-content/" + contents.id}><button className='btn btn-success'>Módosítás</button></NavLink></div>
                </div>

            )}
        </div>
    );
}
export default ContentSinglePage;
