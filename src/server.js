/*
 *  --------------------------------------------------------------------------
 *  Fake Backend Created with Mirage JS for auths, Loans, And Payments Plans
 *  --------------------------------------------------------------------------
 */
import { createServer, RestSerializer, Model, hasMany, belongsTo, Response} from "miragejs";
import dayjs from  "dayjs"

export default  () => {
	createServer({
		serializers: {
			payment: RestSerializer.extend({
				include: ["loan"],
				embed: true
			}),
			loanRequest: RestSerializer.extend({
				include: ["loan"],
				embed: true
			}),
		},
		// models
		models: {
			user: Model.extend({
				loans: hasMany(),
				loanRequests: hasMany(),
				payments: hasMany()

			}),
			loan: Model.extend({
				payments: hasMany(),
				user: belongsTo(),
				loanRequest: hasMany()
			}),
			payments: Model.extend({
				loan: belongsTo(),
				user: belongsTo()
			}),
			loanRequests: Model.extend({
				loans: belongsTo(),
				user: belongsTo()
			})
		},
		// create seeds for initialization of the app
		seeds(server) {
			server.create("user",{
				name:"James Bond",
				email: "customer@me.co",
				isAdmin: false,
				password: "customer1234",
				token: "Customer1Token"
			})
			let userModel = server.create("user", {
				name: "John Doe",
				email: 'johndoe@me.co',
				isAdmin: true,
				password: 'johndoe1234',
				token: "JohnDoeToken"
			});
			let loanData =[
				{
					title: "Smart Instant",
					amount: 500000,
					interest: 10,
					maxPayBack: dayjs().add(3, "month")
				},
				{
					title: "Small Business",
					amount: 15000000,
					interest: 5,
					maxPayBack:dayjs().add(6, "month")
				}

			]
			server.create("loan", {user: userModel, loanData});
			//creates a customer
			server.create("user",{
				name:"James Bond",
				email: "customer@me.co",
				isAdmin: false,
				password: "customer1234",
				token: "Customer1Token"
			})
			// creates a loan request
			let loanRequest  = {
				status: "pending",
			}
			server.create("loanRequest",loanRequest)

		},

		routes() {
			// Auth and Users
			this.post("/api/auth", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				let user = schema.users.findBy({ token: attrs});
				if(!user) {
					return new Response(401, { some: 'header' }, { error: 'Token Not found' });
				}
				return user;
			})
			this.post("/api/register", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				console.log(attrs);
				let user = schema.users.findBy({email: attrs.email})
				if(user) {
					return new Response(400, { some: 'header' }, { error: 'User already exist' });
				}else  {
					return schema.users.create(attrs)
				}

			})
			this.post("/api/login", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				console.log(attrs);
				const user = schema.users.findBy({ email: attrs.email, password: attrs.password})
				if(!user) {
					return new Response(404, { some: 'header' }, { error: 'User not found' });
				}
				return user
			})

			//loans
			this.get("/api/loans", (schema, request) => {
				return schema.loans.all()
			})
			this.post("/api/loans", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				 return new Response(201, { some: 'header' }, { msg: 'New Loan Created successfully', data:	 schema.loans.create(attrs) });

			})
			this.get("/api/loans/:id", (schema, request) => {
				let loanID = request.params.id
				return  schema.loans.find(loanID);
			})
			this.patch("/api/loans/:id", (schema, request) => {
				let loanID = request.params.id;
				let attrs = JSON.parse(request.requestBody);
				let loan =  schema.loans.find(loanID);
				return loan.update(attrs)

			})
			this.delete("/api/loans/:id", (schema, request) => {
				let id = request.params.id
				return schema.loans.find(id).destroy()
			})
			// Payments
			this.get("/api/loans/:id/payments", (schema, request) => {
				let payment = request.params.id
				let loan =  schema.loans.find(payment);
				return loan.payments;
			})
			this.post("/api/loans/:id/payments", (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				let loanID = request.params.id
				let loan =  schema.loans.find(loanID);
				return loan.payments.create(attrs);
			})
			this.delete("/api/payments/:id", (schema, request) => {
				let id = request.params.id
				return schema.payments.find(id).destroy()
			})
		}


	})
}