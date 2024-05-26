import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export function ContentDelPage(props) {
    const params = useParams();
    const id = params.contentId;
    const navigate = useNavigate();
    const [contents, setContents] = useState([]);
    const [isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://chess.sulla.hu/chess/${id}`)
                const contents = await res.json();
                setContents(contents);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setPending(false);
            }
        })
            ();
    }, [id]);
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
                        <h5 className="card-title">Törlendő elem neve: {contents.name}</h5>
                        <div className="lead">Születési idő: {contents.birth_date}</div>
                    </div>
                    <form onSubmit={(event) => {

                        event.persist();
                        event.preventDefault();
                        fetch(`https://chess.sulla.hu/chess/${id}`, {
                            method: "DELETE",
                        })

                            .then(() => {
                                navigate("/");
                            })
                            .catch(console.log);
                    }}>
                        <div>
                            <NavLink to={"/"}><button className="btn btn-secondary m-2">Mégsem</button></NavLink>
                            <button className="btn btn-danger">Törlés</button></div></form>
                </div>

            )}
        </div>
    );
}
export default ContentDelPage;
