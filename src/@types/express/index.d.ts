declare global {
	namespace Express {
		interface Request {
			foundUser: {
				userId: string;
			};
		}
	}
}

export {};
