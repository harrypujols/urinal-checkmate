FROM ruby:2.6

# Install the last compatible ffi version first
RUN gem install ffi -v 1.15.5 && gem install compass

WORKDIR /app