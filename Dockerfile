# FROM ruby:2.5.1-alpine
FROM ruby:2.6.3

RUN apt-get update -qq && apt-get install -y nodejs yarn sqlite3

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -\
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

RUN mkdir -p /app

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile* package.json yarn.lock ./

COPY . .

RUN gem install bundler
RUN bundle install

# Add a script to be executed every time the container starts.
EXPOSE 3001

# Configure the main process to run when running the image
CMD ["rails", "s"]

