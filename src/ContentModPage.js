import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function ContentModPage(props) {
    const params = useParams();
    const id = params.contentId;
    const navigate = useNavigate();
    const [contents, setContents] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
                setContents(response.data);
            } catch (error) {
                console.log('Error fetching content data:', error);
            }
        };

        fetchContentData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setContents(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://chess.sulla.hu/chess/${id}`, contents)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Error updating contents data:', error);
        });
};

    return (
        <div className="p-5 content container bg-whitesmoke w-75 text-center">
            <h2>Egy content módosítása</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Content név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={contents.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési dátum:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" defaultValue={contents.birth_date} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" value={contents.world_ch_won.toString()} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" defaultValue={contents.profile_url} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" defaultValue={contents.image_url} onChange={handleInputChange}/>
                    <img src={contents.image_url} height="200px" alt={contents.name}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
    }
export default ContentModPage;
