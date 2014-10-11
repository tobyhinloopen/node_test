default:
	node main.js

install:
	npm install supervisor -g

start:
	supervisor -q main.js
