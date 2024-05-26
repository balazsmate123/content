import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export function ContentListPage() {

    const [contents, setContents] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get("https://chess.sulla.hu/chess")
            .then((res) => res.data)
            .then((data) => setContents(data))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <p className="h1">Content</p>
                    {contents.map((content, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="h5">Név: {content.name}</p>
                            <div className="card-body">
                                <NavLink key={content.id} to={"/content/" + content.id}>
                                    <img alt={content.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={content.image_url ? content.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <p className="text-secondary">Születési dátum: {content.birth_date}</p>
                                <p className="text-secondary">Megnyert világbajnokságok: {content.world_ch_won}</p>
                                <br />
                                <NavLink to={content.profile_url} target="_blank">Wikipédia link</NavLink><br />
                                <NavLink to={"/mod-content/" + content.id}>
                                    <button className='btn btn-info m-1'>Módosítás</button>
                                </NavLink>
                                <NavLink to={"/del-content/" + content.id}>
                                    <button className='btn btn-danger'>Törlés</button>
                                </NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}
export default ContentListPage;
