FROM nginx

RUN mkdir -p /app

WORKDIR /app

COPY . .

COPY ./nginx-entrypoint.sh /usr/local/bin/nginx-entrypoint.sh

RUN rm /etc/nginx/conf.d/default.conf

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY ./index.html /usr/share/nginx/html/index.html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

RUN ["chmod", "+x", "/usr/local/bin/nginx-entrypoint.sh"]

ENTRYPOINT ["/usr/local/bin/nginx-entrypoint.sh"]
