# DiscountPredictor-Macerick2.0

We present you with an app that shall with great accuracy provide you the value of various discounts whichs you can obtain by providing the details of the associated product. 

## Accessing the final result

The product can be accessed on [https://kronos-discount-predictor.netlify.app/](https://kronos-discount-predictor.netlify.app/).
The site should be quite userfriendly and fun to test out.

## Setting up Locally

### Running the server:

The server cuurently uses flask and processes all the required computations. Do check `requirements.text` to know what all packages are required for the same.

To downlod all the packages run:
`pip3 install -r requirements.txt`
To run the server open the folder containing `app.py` and run the command:
`flask run`

This shall setup the active running server in which all the requests shall be sent from the frontend which we have in the next section.

### Setting up the frontend:

On a new termninal instance run the followng commands to setup the frontpage:

- `cd frontend`
- `npm init`
- `npm start`

This shall setup your webpage instance at `http://localhost:3000/'. Run and enjoy!