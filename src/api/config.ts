const development = {
  base: 'https://api.d-02.niceplayer.ru/',
};

const production = {
  base: 'https://api.d-02.niceplayer.ru/',
};

const isProduction = process.env.NODE_ENV === 'production';

export default isProduction ? production : development;
