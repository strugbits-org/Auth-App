# Auth-App
Simple user authentication feature using NestJS and React (Next.js).

How to run it?

- Backend

	- Please make sure the docker is installed.
	- Open docker-compose file in editor and update the ports section's ip to your local wsl ip address
	- Open up a terminal in root directory of BE.
	- Run 'docker-compose up -d' to create database.
	- Open app.module in editor and update the host to you local wsl ip address
	- npm install
	- npm run start:dev to run project in watchmode

- Frontend

	- npm install
	- npm run dev
	- Go to http://localhost:3000 to view app
