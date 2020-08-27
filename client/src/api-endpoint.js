

export default function endpoint() {

        const endpoint = [
                'http://localhost:8000/',
                'https://chat.cogniwonder.com/',
                'https://cogniwonder.herokuapp.com/'
        ];

        switch (window.location.origin) {
                case 'http://localhost:3000':
                        window.API_ENDPOINT = endpoint[2];
                        return window.API_ENDPOINT;

                default:
                        window.API_ENDPOINT = window.location.origin + '/';
                        return window.API_ENDPOINT;
        }

}

