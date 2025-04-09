<!-- src/components/Login.vue -->
<template>
	<div
		class="login container mx-auto px-4 py-8 bg-white rounded-lg shadow-md self-center"
	>
		<h1 class="text-3xl font-bold text-gray-800 mb-6">Login or Register</h1>
		<form
			@submit.prevent="handleSubmit"
			class="space-y-4"
		>
			<div>
				<label class="block text-gray-700 font-medium">Username:</label>
				<input
					v-model="username"
					type="text"
					placeholder="Enter username"
					class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
				/>
			</div>
			<div>
				<label class="block text-gray-700 font-medium">Password:</label>
				<input
					v-model="password"
					type="password"
					placeholder="Enter password"
					class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
				/>
			</div>
			<button
				type="submit"
				class="btn w-full hover:bg-green-700 transition duration-300"
			>
				{{ isRegistering ? "Register" : "Login" }}
			</button>
			<p class="text-gray-600 text-center">
				<button
					type="button"
					@click="toggleMode"
					class="text-blue-600 hover:underline"
				>
					{{ isRegistering ? "Switch to Login" : "Switch to Register" }}
				</button>
			</p>
			<p
				v-if="error"
				class="text-red-600 text-center"
			>
				{{ error }}
			</p>
		</form>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			username: "",
			password: "",
			isRegistering: false,
			error: "",
		};
	},
	methods: {
		toggleMode() {
			this.isRegistering = !this.isRegistering;
			this.error = "";
		},
		async handleSubmit() {
			this.error = ""; // Clear previous errors
			if (!this.username || !this.password) {
				this.error = "Please enter both username and password";
				return;
			}
			if (this.isRegistering) {
				// Register: Save new user and log them in
				await this.$store.dispatch("updateUser", {
					username: this.username,
					password: this.password,
					userData: { name: "", email: "", favoriteThing: "" },
				});
				const loginSuccess = await this.$store.dispatch("login", {
					username: this.username,
					password: this.password,
				});
				if (loginSuccess) {
					console.log("Registered and logged in as:", this.username);
					this.$router.push("/home");
				} else {
					this.error = "Registration failed unexpectedly";
				}
			} else {
				// Login: Validate credentials
				const success = await this.$store.dispatch("login", {
					username: this.username,
					password: this.password,
				});
				if (success) {
					console.log("Logged in as:", this.username);
					this.$router.push("/home");
				} else {
					this.error = "Invalid username or password";
				}
			}
		},
	},
};
</script>
