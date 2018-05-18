
import React from "react";
import { startAddProject } from "../actions/projects";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Container, Col } from 'reactstrap';
import Header from "./Header";

class AddProject extends React.Component {

    state = {
        title: "",
        subTitle: "",
        overview: "",
        address : "",
        locationMapInfo: [ 17.516247, 78.385560 ],
        specs : [],
        amenities : [],
        floorPlans : [],
        brochure : "",
        createdOn : 0,
        thumbnailImageUrl : "",
        landscapeImageUrl : "",
        status: "ongoing"
    };

    localSpecs = [];

    handleThumbnailImgUpload = (e) => {

        e.preventDefault();
        const reader = new FileReader();
        const image = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            thumbnailImageUrl: reader.result
          });

        }

        reader.readAsDataURL( image );

    };

    handleLandscapeImgUpload = (e) => {

        e.preventDefault();
        const image = e.target.files[0];

        const reader = new FileReader();
    
        reader.onloadend = () => {
          this.setState({
            landscapeImageUrl: reader.result
          });

        }

        reader.readAsDataURL( image );

    };

    handleFloorPlansUpload = ( e ) => {

        e.preventDefault();
        const files = e.target.files;

        for ( const file in files ){

            if ( /\.(jpe?g|png|gif)$/i.test( files[ file ].name ) ) {
                
                const reader = new FileReader();

                reader.onloadend = () => {

                    this.setState({
                        floorPlans : [ ...this.state.floorPlans, reader.result ]
                    });
          
                }
          
                reader.readAsDataURL( files[ file ] );

            } 

        }

    }

    handleBrochureUpload = (e) => {

        e.preventDefault();
        const reader = new FileReader();
        const pdfFile = e.target.files[0];
    
        reader.onload = () => {
            const base64 = reader.result.replace(/^[^,]*,/, '');
            this.setState({
                brochure: base64
            });
        }

        reader.readAsDataURL( pdfFile );

    };

    handleSubmit = (e) =>  {

        e.preventDefault();

        if( this.state.title.length !== 0 ){
            this.props.dispatch( 
                startAddProject( { 
                    title: this.state.title, 
                    subTitle: this.state.subTitle,
                    overview: this.state.overview,
                    thumbnailLocation: this.state.thumbnailImageUrl,
                    imageLocation: this.state.landscapeImageUrl,
                    brochure: this.state.brochure,
                    status: this.state.status,
                    address: this.state.address,
                    createdOn: Date.now(),
                    specs: this.state.specs,
                    locationMapInfo: this.state.locationMapInfo,
                    floorPlans: this.state.floorPlans
                }) 
            );
        }

        //https://pdfobject.com/static.html

        //e.target.children.name.value = e.target.children.subtitle.value = e.target.children.overview.value = "";
        this.setState( () => ({ 
            imageUrl : "",
            title: "",
            subTitle: "",
            overview: "" 
        }));
        

    };

    handleStatusChange = ( e ) => {
        
        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { status : e.target.value } ) );
  
    };

    handleTitleChange = ( e ) => {
        
        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { title : e.target.value } ) );
  
    };

    handleSubTitleChange = ( e ) => {
        
        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { subTitle : e.target.value } ) );
  
    };

    handleOverviewChange = ( e ) => {
        
        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { overview : e.target.value } ) );
  
    };

    handleAddressChange = ( e ) => {
        
        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { address : e.target.value } ) );
  
    };

    handleMapLocationChange = ( e ) => {
        
        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { locationMapInfo : e.target.value } ) );
  
    };

    keyUpEvent = ( e ) => {
        // Cancel the default action, if needed
        debugger;
        e.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if ( e.keyCode === 13 ) {
          // Trigger the button element with a click
            if( e.target && e.target.id === "specInput" ){

                this.updateSpecs( e );

            }

            if( e.target && e.target.id === "amenityInput" ){

                this.updateAmenities( e );

            }

        }

    };

    updateSpecs = ( e ) => {

        if( e.target.value ){

            const inputStringSplit = e.target.value.split( ":" );
            const newSpecObj = {};
            newSpecObj[ inputStringSplit[ 0 ][ 0 ].toUpperCase() + inputStringSplit[ 0 ].substr( 1 ) ] = inputStringSplit[ 1 ].trim();

            this.setState({
                specs : [ ...this.state.specs, newSpecObj ]
            });

            const specInputDiv = document.getElementById( "specInput" );

            specInputDiv.removeEventListener( "keyup", this.keyUpEvent );
            specInputDiv.value = "";
        }

    };

    updateAmenities = ( e ) => {

        if( e.target.value ){

            this.setState({
                amenities : [ ...this.state.amenities, e.target.value ]
            });

            const amenityInputDiv = document.getElementById( "amenityInput" );

            amenityInputDiv.removeEventListener( "keyup", this.keyUpEvent );
            amenityInputDiv.value = "";
        }

    };

    addEventListener = () => {

        document.getElementById( "specInput" ).addEventListener( "keyup", this.keyUpEvent );
        document.getElementById( "amenityInput" ).addEventListener( "keyup", this.keyUpEvent );

    };

    render(){

        return( 

            <div>

                <div className = "buyers-guide-container mx-auto">
                                    
                    <Container>
                        
                        <Header activeTab = "buyersguide"/>
                        
                        <Row className = "justify-content-center">

                            <div className = "col-lg-12 col-md-12">

                                <Row className = "justify-content-center">
                                    <h3 className = "project-item_title"> New Project</h3>
                                </Row>

                                <Row className = "justify-content-center">
                                    <div>
                                        <hr className = "projects_divider" />                               
                                    </div>
                                </Row>
                                
                                <Row className = "justify-content-center buyersguide_box contact_form_div">
                                    <Col xs="10" >
                                        <Form onSubmit = { (e) => { e.preventDefault(); } }>

                                            {/* Title Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectTitle" 
                                                    color="warning" 
                                                    className="contact_text_format" 
                                                >
                                                    Project Title:
                                                </FormText>
                                                <Input 
                                                    type="text" 
                                                    name="name" 
                                                    id="projectTitle" 
                                                    placeholder="Ex: Nandanavanam" 
                                                    onChange={ this.handleTitleChange } 
                                                    className = "contact_input"
                                                />
                                            </FormGroup>

                                            {/* SubTitle Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectSubtitle" 
                                                    color="warning" 
                                                    className="contact_text_format"
                                                > 
                                                    Project Subtitle:
                                                </FormText>
                                                <Input 
                                                    type="text" 
                                                    name="subtitle" 
                                                    id="projectSubtitle" 
                                                    placeholder="Ex: 2 & 3 BHK, GHMC Approved Project"
                                                    onChange={ this.handleSubTitleChange } 
                                                    className = "contact_input"
                                                />
                                            </FormGroup>

                                            {/* Overview Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectOverview" 
                                                    color="warning" 
                                                    className="contact_text_format"
                                                > 
                                                    Project Overview:
                                                </FormText>
                                                <Input 
                                                    type="textarea" 
                                                    name="projectOverview" 
                                                    id="projectOverview" 
                                                    placeholder="Overview" 
                                                    onChange={ this.handleOverviewChange } 
                                                    className = "contact_input"
                                                />
                                            </FormGroup>

                                            {/* Address Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectAddress" 
                                                    color="warning" 
                                                    className="contact_text_format"
                                                > 
                                                    Address:
                                                </FormText>
                                                <Input 
                                                    type="text" 
                                                    name="address" 
                                                    id="projectAddress" 
                                                    placeholder="Ex: 59, Blooming Dale Road, Madhura Nagar, Nizampet, Hyderabad, Telangana 500090, India" 
                                                    onChange={ this.handleAddressChange } 
                                                    className = "contact_input"
                                                />
                                            </FormGroup>

                                            {/* Location Co-Ordinates Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="mapCoOrdinates" 
                                                    color="warning" 
                                                    className="contact_text_format"
                                                > 
                                                    Map Co-Ordinates:
                                                </FormText>
                                                <Input 
                                                    type="text" 
                                                    name="locationMapInfo" 
                                                    id="mapCoOrdinates" 
                                                    placeholder="[ 17.516247, 78.385560 ]"
                                                    onChange={ this.handleMapLocationChange } 
                                                    className = "contact_input"
                                                />
                                                <FormText color="muted">
                                                    Use Google Maps to select a location. Right click on the location to click 'whats here'. It should show you co-ordinates in the bottom.
                                                </FormText>
                                            </FormGroup>                                            

                                            {/* Specifications Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectSpecs" 
                                                    color="warning" 
                                                    className="contact_text_format"
                                                > 
                                                    Specifications:
                                                </FormText>

                                                <Input
                                                    type="text" 
                                                    name="spec" 
                                                    id="specInput"
                                                    placeholder="Specification Name : Specification Detail" 
                                                    className = "contact_input"
                                                    onChange = { this.addEventListener }
                                                />

                                                <FormText color="muted">
                                                    Enter each specification in given format and click "Enter"
                                                </FormText>

                                                {
                                                    this.state.specs.map( ( spec ) => {
                                                        
                                                        return ( <span class="badge badge-secondary">{JSON.stringify(spec)}</span> );

                                                    })

                                                }

                                            </FormGroup>

                                            {/* Amenities Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectAmenities" 
                                                    color="warning" 
                                                    className="contact_text_format"
                                                > 
                                                    Amenities:
                                                </FormText>

                                                <Input
                                                    type="text" 
                                                    name="amenity" 
                                                    id="amenityInput"
                                                    placeholder="Amenity name" 
                                                    className = "contact_input"
                                                    onChange = { this.addEventListener }
                                                />

                                                <FormText color="muted">
                                                    Enter each Amenity name and click "Enter"
                                                </FormText>

                                                {
                                                    this.state.amenities.map( ( amenity ) => {
                                                        
                                                        return ( <span class="badge badge-secondary">{ JSON.stringify( amenity ) }</span> );

                                                    })

                                                }

                                            </FormGroup>

                                            {/* Thumbnail Image Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectThumbnailImage" 
                                                    color="warning" 
                                                    className="contact_text_format" 
                                                >
                                                    Project's Thumbnail Image:
                                                </FormText>

                                                <Button color="dark" size="lg" className="contact_text_format disabled" >
                                                    <Input 
                                                        type="file" 
                                                        name="projectThumbnailImage" 
                                                        id="projectThumbnailImage" 
                                                        onChange={ this.handleThumbnailImgUpload } 
                                                    />
                                                </Button>
                                                <FormText color="muted">
                                                    This image is used to display on "Projects" tab.
                                                </FormText>
                                            </FormGroup>

                                            {/* Landscape Image Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectLandscapeImage" 
                                                    color="warning" 
                                                    className="contact_text_format" 
                                                >
                                                    Project's Landscape Image:
                                                </FormText>

                                                <Button color="dark" size="lg" className="contact_text_format disabled" >
                                                    <Input 
                                                        type="file" 
                                                        name="projectLandscapeImage" 
                                                        id="projectLandscapeImage" 
                                                        onChange={ this.handleLandscapeImgUpload } 
                                                    />
                                                </Button>
                                                <FormText color="muted">
                                                    This image is used to as a landscape image in Project's info.
                                                </FormText>
                                            </FormGroup>

                                            {/* Floor Plans Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectFloorPlans" 
                                                    color="warning" 
                                                    className="contact_text_format" 
                                                >
                                                    Floor Plans:
                                                </FormText>

                                                <Button color="dark" size="lg" className="contact_text_format disabled" >
                                                    <Input 
                                                        type="file" 
                                                        name="projectFloorPlans" 
                                                        id="projectFloorPlans" 
                                                        onChange={ this.handleFloorPlansUpload } 
                                                        multiple
                                                    />
                                                </Button>
                                                <FormText color="muted">
                                                    These images are used to display in 'Floor Plans' section in each project info.
                                                </FormText>
                                            </FormGroup>

                                            {/* Brochure PDF Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectBrochure" 
                                                    color="warning" 
                                                    className="contact_text_format" 
                                                >
                                                    Project's Brochure:
                                                </FormText>

                                                <Button color="dark" size="lg" className="contact_text_format disabled" >
                                                    <Input 
                                                        type="file" 
                                                        name="projectBrochure" 
                                                        id="projectBrochure" 
                                                        onChange={ this.handleBrochureUpload } 
                                                    />
                                                </Button>
                                                <FormText color="muted">
                                                    This pdf file is used to display brochure in project info section.
                                                </FormText>
                                            </FormGroup>                                            

                                            {/* Status Section */}
                                            <FormGroup>
                                                <FormText 
                                                    for="projectStatus" 
                                                    color="warning" 
                                                    className="contact_text_format" 
                                                >
                                                    Project Status:
                                                </FormText>
                                                <Input 
                                                    type="select" 
                                                    name="projectStatus" 
                                                    id="projectStatus" 
                                                    onChange = { this.handleStatusChange } 
                                                    className = "contact_input"
                                                >
                                                    <option value = "completed" >Completed</option>
                                                    <option value = "ongoing" >Ongoing</option>
                                                </Input>
                                            </FormGroup>

                                            <Button color="danger" size="lg" className="contact_text_format" onClick = { this.handleSubmit } >Submit</Button>
                                        </Form>
                                    </Col>
                                </Row>

                            </div>

                        </Row>
                    </Container>
                </div>
            </div>

        );
        
    };

};

export default connect()( AddProject );

// Use https://github.com/jsdir/react-ladda for upload button
// https://github.com/instructure-react/react-select-box for select box
// https://github.com/andreypopp/react-textarea-autosize for text area
// https://github.com/alexkuz/react-input-enhancements for input enhancements