import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import '../AddService/AddService.css';

const AddTechnicians = () => {
    const { register, handleSubmit, reset } = useForm();
    const [imageURL, setImageURL] = useState(null); 
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    const onSubmit =  data => {

        const technicianData = {
            fullname:data.fullname,
            expert:data.expert,
            description:data.description,
            phone:data.phone,
            rating:data.rating,
            image: imageURL
        }

        const loading = toast.loading('Adding...Please wait!');

        const url = "http://localhost:5000/add-technicians";
        fetch(url,{
            method: 'POST',
            headers:{
            'Content-Type':'Application/json'
            },
            body:JSON.stringify(technicianData)
        })
        .then(res=>{
            if(res){
                toast.dismiss(loading);    
                reset();
                setIsButtonDisable(true)
                return swal(`Successfully Added!`, `${data.fullname} service has been successfully Added`, "success");
            }
            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
    })
    }

    const handleImageUpload = event =>{
        const imageData = new FormData();
        imageData.set("key", "393a99f764f06bff1a733165618f39e2");
        imageData.append('image', event.target.files[0])
        const loading = toast.loading('Uploading...Please wait!');
  
        axios.post('https://api.imgbb.com/1/upload', imageData)
        .then(function (response) {
            toast.dismiss(loading);  
            if(response){
                toast.success('Successfully upload Image...!!!')    
                setImageURL(response.data.data.display_url);
                // setIsButtonDisable(true);
            }
        })
        .catch(error => toast.error(error.message));
     }

    return (
        <section className="add-service">
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)} className="w-100 shadow">
                    <div className="p-5 bg-white form-main" style={{ borderRadius: "15px" }}>
                        <Form.Row className="justify-content-center">
                        
                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5 admin-group">
                                <Form.Label>Technician Name</Form.Label>
                                <Form.Control type="text" {...register("fullname", { required: true })}placeholder="Enter Technician Name" />
                            </Form.Group>

                            <Form.Group as={Col} md={5} sm={12} className='admin-group'>
                                <Form.Label >expert</Form.Label>
                                <Form.Control   type="text" {...register("expert", {required: true })} placeholder="Enter Expert Field" />
                            </Form.Group>

                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5 admin-group service-type">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" {...register("phone", { required: true })}placeholder="Enter Phone" />
                            </Form.Group>
                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5 admin-group service-type">
                                <Form.Label>Experience of Year</Form.Label>
                                <Form.Control type="text" {...register("rating", { required: true })}placeholder="Enter Experience of Year" />
                            </Form.Group>
                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5 admin-group">
                                {/* <Form.Label>Service Title</Form.Label> */}
                                {/* <Form.Control type="text" {...register("name", { required: true })}placeholder="Enter Service Title" /> */}
                            </Form.Group>

                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5 mt-md-3 admin-group">
                                <Form.Label>Description</Form.Label>
                                <Form.Control  type="text" as="textarea"{...register("description", { required: true})} placeholder="Enter Service Description" />
                            </Form.Group>

                            <Form.Group as={Col} md={5} sm={12} className="mt-md-3 admin-group">
                                <Form.Label>Add Image</Form.Label>
                                <Button as={"label"} htmlFor="upload" variant="outline-primary" className="d-block p-2 upload-btn">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />Upload Image
                                </Button>
                                <Form.Control hidden="hidden" id="upload" onChange={handleImageUpload} type="file" placeholder="Upload photo" />
                            </Form.Group>

                        </Form.Row>
                        <div className="text-center mt-4">
                            <Button type="submit" variant='info' disabled={isButtonDisable}  className='main-button'>Add Technicians</Button>
                        </div>
                    </div>
                </Form>
             </Container>
        </section>
    );
};

export default AddTechnicians;