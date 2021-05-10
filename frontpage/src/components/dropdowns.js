import react, { Component, useState } from 'react';
import Select from 'react-select';
import ToggleButton from 'react-toggle-button'
import { Alert, FormGroup,FormControl,InputGroup,Button,Card} from 'react-bootstrap';


const segmentOptions = [
    { value: 'Drink Led', label: 'Drink Led' },
    { value: 'Institutional', label: 'Institutional' },
    { value: 'Entertainment Led', label: 'Entertainment Led' },
    { value: 'Food Led', label: 'Food Led' },
    { value: 'Wholesaler', label: 'Wholesaler' },
    { value: 'Not applicable', label: 'Not applicable' },
];

const subsegmentOptions = [
    { value: 'Party Place', label: 'Party Place',segment:'Drink Led'},
    { value: 'Bar', label: 'Bar' ,segment:'Drink Led'},
    { value: 'Beer bar', label: 'Beer bar' ,segment:'Drink Led'},
    { value: 'Cocktail Bar', label: 'Cocktail Bar' ,segment:'Drink Led'},
    { value: 'Local Bar', label: 'Local Bar' ,segment:'Drink Led'},

    { value: 'Institutional', label: 'Institutional',segment:'Institutional' },

    { value: 'Events', label: 'Events',segment:'Entertainment Led'},
    { value: 'Sports Venue', label: 'Sports Venue',segment:'Entertainment Led' },
    { value: 'Recreational', label: 'Recreational',segment:'Entertainment Led' },
    { value: 'Music Venue', label: 'Music Venue',segment:'Entertainment Led' },

    { value: 'Restaurant', label: 'Restaurant',segment:'Food Led' },
    { value: 'Quick Dining', label: 'Quick Dining' ,segment:'Food Led' },
    { value: 'Hybrid', label: 'Hybrid' ,segment:'Food Led' },

    { value: 'Sub Agent', label: 'Sub Agent',segment:'Wholesaler'  },

    { value: 'Not applicable', label: 'Not applicable',segment:'Not applicable' },

];

let subbrandDisplay = []

const tierValues = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
];

const pocImageOptions = [
    { value: 'Mainstream', label: 'Mainstream' },
    { value: 'Premium', label: 'Premium' },
];

const provinceOptions = [
    { value: 'Antwerp', label: 'Antwerp' },
    { value: 'Liège', label: 'Liège' },
    { value: 'Hainaut', label: 'Hainaut' },
    { value: 'Flemish Brabant', label: 'Flemish Brabant' },
    { value: 'West Flanders', label: 'West Flanders' },
    { value: 'East Flanders', label: 'East Flanders' },
    { value: 'Limburg', label: 'Limburg' },
    { value: 'Brussels Capital Region', label: 'Brussels Capital Region' },
    { value: 'Walloon Brabant', label: 'Walloon Brabant' },
    { value: 'Luxembourg', label: 'Luxembourg' },
    { value: 'Namur', label: 'Namur' },
];

const brandOptions = [
    { value: 'JUPILER', label: 'JUPILER' },
    { value: 'PIEDBOEUF', label: 'PIEDBOEUF' },
    { value: 'DIEKIRCH', label: 'DIEKIRCH' },
    { value: 'BELLE VUE', label: 'BELLE VUE' },
    { value: 'HOEGAARDEN', label: 'HOEGAARDEN' },
    { value: 'LEFFE', label: 'LEFFE' },
    { value: 'TRIPEL KARMELIET', label: 'TRIPEL KARMELIET' },
    { value: 'STELLA ARTOIS', label: 'STELLA ARTOIS' },
    { value: 'KWAK', label: 'KWAK' },
    { value: 'SCOTCH CTS', label: 'SCOTCH CTS' },
    { value: 'PURE BLONDE', label: 'PURE BLONDE' },
    { value: 'BASS', label: 'BASS' },
    { value: 'KRUGER', label: 'KRUGER' },
    { value: 'GINETTE', label: 'GINETTE' },
    { value: 'GOOSE ISLAND', label: 'GOOSE ISLAND' },
    { value: 'CORONA', label: 'CORONA' },
    { value: "BECK'S", label: "BECK'S" },
    { value: 'HORSE ALE', label: 'HORSE ALE' },
    { value: 'VIEUX TEMPS', label: 'VIEUX TEMPS' },
    { value: 'CUBANISTO', label: 'CUBANISTO' },
    { value: 'SAFIR', label: 'SAFIR' },
    { value: 'GINDER-ALE', label: 'GINDER-ALE' },
    { value: 'BIRRA DEL BORGO', label: 'BIRRA DEL BORGO' },
    { value: 'DEUS', label: 'DEUS' },
];

const packTypeOptions = [
    { value: 'BULK', label: 'BULK' },
    { value: 'BOTTLE', label: 'BOTTLE' },
    { value: 'KEG', label: 'KEG' },
    { value: 'PERFECTDRAFT', label: 'PERFECTDRAFT' },
    { value: 'CAN', label: 'CAN' },
];


class Dropdowns extends Component {
    state = {
        segment:null,
        subSegment:null,
        sfdcTier:0,
        pocImage:"NULL",
        province:"NULL",
        brand:"NULL",
        packType:"NULL",
        returnability:1,
        gto:0,
        volume:0,
        tax:0,
        displayText:"Your required discounts shall be displayed here",
        displayText2:"",
        displayWarning: false,
    };
    

    componentDidMount() {}

    handleChange1 = segment => {
        this.setState({ segment });
        console.log(`Option selected:`, segment);
        subbrandDisplay = subsegmentOptions.filter(vals => vals.segment == segment.value)
    };

    handleChange2 = subSegment => {
        this.setState({ subSegment });function AlertDismissibleExample() {
            const [show, setShow] = useState(true);
          
            if (show) {
              return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                  <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                  <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                  </p>
                </Alert>
              );
            }
            return <Button onClick={() => setShow(true)}>Show Alert</Button>;
          }
        console.log(`Option selected:`, subSegment);
    };



    handleChange3 = sfdcTier => {
        this.setState({ sfdcTier });
        console.log(`Option selected:`, sfdcTier);
    };

    handleChange4 = pocImage => {
        this.setState({ pocImage });
        console.log(`Option selected:`, pocImage);
    };

    handleChange5 = province => {
        this.setState({ province });
        console.log(`Option selected:`, province);
    };
    
    handleChange6 = brand => {
        this.setState({ brand });
        console.log(`Option selected:`, brand);
    };

    handleChange7 = packType => {
        this.setState({ packType });
        console.log(`Option selected:`, packType);
    };

    handleChange8 = returnability => {
        this.setState({ returnability: (returnability?0:1) });
        console.log(`Option selected:`, returnability);
    };

    handleChange9 = () => {
        this.setState({ displayWarning: false});
    };

    createRequest = () => {
        console.log("From request creation area ")

        if(this.state.segment == null || this.state.subSegment == null || this.state.pocImage.value === "NULL" ||
           this.state.province.value === "NULL" || this.state.brand.value === "NULL" || this.state.packType.value === "NULL"){
                this.setState({ displayWarning: true});
                console.log("Selection error")
                return (<div></div>)
        }
        else if(parseFloat(this.state.gto) <= 0 || parseFloat(this.state.tax) < 0 || parseFloat(this.state.volume) <=  0){
                this.setState({ displayWarning: true});
                console.log("negative error")
                return (<div></div>)
        }
        else if(parseFloat(this.state.gto).toString() != this.state.gto.toString() || parseFloat(this.state.tax).toString()  != this.state.tax.toString() || parseFloat(this.state.volume).toString()  !=  this.state.volume.toString()){
                this.setState({ displayWarning: true});
                console.log("Not a number eror")
                return (<div></div>)
        }
        else console.log("Entered Data is clean")


		let items = {
            "sfdc_tier":this.state.sfdcTier.value,
            "poc_image":this.state.pocImage.value,
			"segment":this.state.segment.value,
            "sub_segment":this.state.subSegment.value,
            "Brand":this.state.brand.value,
            "Pack_Type":this.state.packType.value,
            "GTO_2019":parseFloat(this.state.gto),
            "Volume_2019 Product":parseFloat(this.state.volume),
            "province":this.state.province.value,
            "returnability":this.state.returnability,
            "Tax":parseFloat(this.state.tax),
		}

        let results = {
            "oni":0,
            "offni":0,
        }

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items })
		};
        console.log("Request body: ",JSON.stringify({items}))
		const BASE_URL = "https://kronos-discount.herokuapp.com/results";
		fetch(BASE_URL, requestOptions)
		.then(response => response.json())
		.then(json =>{
			console.log("Json object obtained is:",json);

            this.setState({displayText:"Oninvoice Discount = " + json["On-Invoice Discount"]});
            this.setState({displayText2:"Offinvoice Discount = " + json["Off-Invoice Discount"] });
			this.setState({items:json},() => {
				console.log("State after update:",this.state);
			});
		})
    }

    


    render() {
    const { segment ,subSegment,sfdcTier,pocImage,province,brand,packType,returnability} = this.state;

    return (
        <div>

            {this.state.displayWarning?<Alert variant="danger" onClick={this.handleChange9} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    It's probably cause you haven't selected an option (all are required) 
                    or 
                    your written values are negative/invalid. Please correct these errors and try again.
                </p>
            </Alert>:<div></div>
            }
            <Select value={segment}
                onChange={this.handleChange1}
                options={segmentOptions}
                placeholder = {"Segment"}
            />

            <Select value={subSegment}
                onChange={this.handleChange2}
                options={subbrandDisplay}
                placeholder = {"Subsegment (select segment first)"}
            />

            <Select value={sfdcTier}
                onChange={this.handleChange3}
                options={tierValues}
                placeholder = {"Select your SFDC tier"}
            />

            <Select value={pocImage}
                onChange={this.handleChange4}
                options={pocImageOptions}
                placeholder = {"Select your POC image type"}
            />

            <Select value={province}
                onChange={this.handleChange5}
                options={provinceOptions}
                placeholder = {"Select your Province"}
            />

            <Select value={brand}
                onChange={this.handleChange6}
                options={brandOptions}
                placeholder = {"Select Brand"}
            />

            <Select value={packType}
                onChange={this.handleChange7}
                options={packTypeOptions}
                placeholder = {"Select desired pack type"}
            />
            
            <div className = "returnCss">
                <font color='#971B1E'><b>Is the package returnable?</b></font>
                <ToggleButton
                    value={returnability || false }
                    inactiveLabel={"No"}
                    activeLabel={"Yes"}
                    onToggle={this.handleChange8}
                />
            </div>

            <FormGroup align = "center">
                <InputGroup>
                    <FormControl
                        type = "text"
                        placeholder="Enter value for GTO"
                        onChange = {event => this.setState({gto:event.target.value})}
                    />
                </InputGroup>
            </FormGroup>

            <FormGroup align = "center">
                <InputGroup>
                    <FormControl
                        type = "text"
                        placeholder="Enter volume of product"
                        onChange = {event => this.setState({volume:event.target.value})}
                    />
                </InputGroup>
            </FormGroup>

            <FormGroup align = "center">
                <InputGroup>
                    <FormControl
                        type = "text"
                        placeholder="Enter levied Tax"
                        onChange = {event => this.setState({tax:event.target.value})}
                    />
                </InputGroup>
            </FormGroup>
            <div width = "100%" align='center'>
            <Card style={{ width: '25rem', height: '13rem'}} align = "center">
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body align = "center">
                <Card.Title><b>Discounts</b></Card.Title>
                <Card.Text>
                  {this.state.displayText}
                  <br/>
                  {this.state.displayText2}
                </Card.Text>
                <Button variant = "info" onClick = {this.createRequest} >Get Discounts</Button>
              </Card.Body>
            </Card>)
            </div>
        </div>
    );
  }
}

export default Dropdowns;