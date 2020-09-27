/*
 *  --------------------------------------------------------------------------
 *  Fake Backend Created with Mirage JS for auths, Loans, And Payments Plans
 *  --------------------------------------------------------------------------
 */
import { createServer, RestSerializer, Model, hasMany, belongsTo, Response} from 'miragejs';
import dayjs from  'dayjs'

export default  () => {
	createServer({
		serializers: {
			loan: RestSerializer.extend({
				include: ['user', 'loanRequests'],
				root: true,
				embed: true,
				alwaysIncludeLinkageData: true,
			}),
			loanRequests: RestSerializer.extend({
				include: ['loan','user'],
				embed: true,
				alwaysIncludeLinkageData: true,
			}),
		},
		// models
		models: {
			user: Model.extend({
				loans: hasMany(),
				loanRequests: hasMany(),

			}),
			loan: Model.extend({
				user: belongsTo(),
				loanRequests: hasMany()
			}),
			loanRequests: Model.extend({
				loan: belongsTo(),
				user: belongsTo()
			})
		},
		// create seeds for initialization of the app
		seeds(server) {
			//creates an admin user
			let userModel = server.create('user', {
				name: 'John Doe',
				email: 'johndoe@me.co',
				isAdmin: true,
				password: 'johndoe1234',
				token: 'JohnDoeToken'
			});
			//creates a customer
			let customer = server.create('user',{
				name:'James Bond',
				email: 'customer@me.co',
				isAdmin: false,
				password: 'customer1234',
				token: 'Customer1Token'
			})
			// creates a Loan Request 1
			let loanRequest1 = server.create('loanRequest', {
				user: customer,
				status: 'pending',
				paymentChoice: 'weekly',
				dateRequested: dayjs().subtract(5,'day'),
			});
			// creates a Loan Request 2
			let loanRequest2 = 	 server.create('loanRequest', {
				user: customer,
				status: 'declined',
				paymentChoice: 'Daily',
				dateRequested: dayjs().subtract(1,'day'),

			});

			// creates a Loan Request 3
			let loanRequest3 = server.create('loanRequest', {
				user: customer,
				status: 'pending',
				paymentChoice: 'Monthly',
				dateRequested: dayjs().subtract(4,'day'),
			});
			// creates a Loan Request 4
			let loanRequest4 = 	 server.create('loanRequest', {
				user: customer,
				status: 'declined',
				paymentChoice: 'weekly',
				dateRequested: dayjs().subtract(6,'day'),

			});
			// creates a Loan Request 5
			let loanRequest5 = server.create('loanRequest', {
				user: customer,
				status: 'approved',
				paymentChoice: 'Monthly',
				dateRequested: dayjs().subtract(9,'day'),
			});
			// creates a Loan Request 6
			let loanRequest6 = 	 server.create('loanRequest', {
				user: customer,
				status: 'pending',
				paymentChoice: 'weekly',
				dateRequested: dayjs().subtract(11,'day'),

			});


			// create loan 1
			server.create('loan',{
				user:userModel,
				loanRequests:[loanRequest1, loanRequest2],
				title: 'Smart Instant',
				amount: 5000000,
				interest: 10,
				maxPayBack: 3,
			});
			// create loan 2
			server.create('loan',{
				user:userModel,
				loanRequests:[loanRequest3, loanRequest4],
				title: 'Small Business',
				amount: 15000000,
				interest: 15,
				maxPayBack: 6,
			});
			// create loan 3
			server.create('loan',{
				user:userModel,
				loanRequests:[loanRequest5, loanRequest6],
				title: 'Medium Enterprise',
				amount: 50000000,
				interest: 15,
				maxPayBack: 6,
			})
		},

		routes() {
			// Auth and Users
			// check if a user is authenticated
			this.post('/api/auth', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				console.log(attrs);

				let user = schema.users.findBy({ token: attrs});
				if(!user) {
					return new Response(401, { some: 'header' }, 'Token Not found' );
				}
				return user;
			})
			// creates a new user
			this.post('/api/signup', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);

				let user = schema.users.findBy({email: attrs.email})
				const tokenString = attrs.name.split(' ').join(').toString();
				if(user) {
					return new Response(400, { some: 'header' },  'User with this email already exist' );
				}else  {
					return schema.users.create({...attrs, token : `${tokenString}Token`})
				}

			})
			// login a user
			this.post('/api/login', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);

				const user = schema.users.findBy({ email: attrs.email, password: attrs.password})
				if(!user) {
					return new Response(404, { some: 'header' },  'User not found' );
				}
				return user
			})

			//loans
			// gets all loans
			this.get('/api/loans', (schema, request) => {
				return schema.loans.all()
			})
			// creates a new loan
			this.post('/api/loans', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				const loan = schema.loans.findBy({title:attrs.title})
				if(loan){
					return new Response(400, { some: 'header' },  'Loan with this title already exist' );
				}
				schema.loans.create(attrs)
				 return new Response(201, { some: 'header' },  'New Loan Created successfully' );

			})
			// gets a single loan
			this.get('/api/loans/:id', (schema, request) => {
				let loanID = request.params.id
				let loan = schema.loans.find(loanID);
				if(!loan) {
					return new Response(404, { some: 'header' },  'Loan Not Found' );
				}
				return loan
			})
			// updates a loan
			this.patch('/api/loans/:id', (schema, request) => {
				let loanID = request.params.id;
				let attrs = JSON.parse(request.requestBody);
				let  { title, amount, interest, maxPayBack } = attrs
				amount = parseFloat(amount.split(',').join('))
				let loan =  schema.loans.find(loanID);
				 loan.update({title, amount,interest, maxPayBack})
				return new Response(201, { some: 'header' },  'Loan Updated successfully' );

			})
			// deletes a new loan
			this.delete('/api/loans/:id', (schema, request) => {
				let id = request.params.id
				return schema.loans.find(id).destroy()
			})
			//Get all Loans Request
			this.get('/api/loansRequests', (schema, request) => {
				return schema.loanRequests.all()
			})
			//  Get Loan Requests of a specific loan
			this.get('/api/loans/:id/loanRequests', (schema, request) => {
				const loanID = request.params.id;
				const loan = schema.loans.find(loanID)
				return  schema.loan.loanRequests;

			})
			// creates a new loan request
			this.post('/api/loans/:id/loanRequests', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				let loanID = request.params.id
				let loan =  schema.loans.find(loanID);
				return loan.loanRequests.create(attrs);
			})
			// deletes a loan request
			this.delete('/api/loanRequests/:id', (schema, request) => {
				let id = request.params.id
				return schema.loanRequests.find(id).destroy()
			})
		}


	})
}