const axios = require('axios');
const { logger } = require('../common/logger')

const url = 'https://api.mercadolibre.com/'

const searchQuery = async (req, res) => {
    const query = req.params.query

    if (!'query' in req.params) return res.status(400).send('missing query')

    axios.get(url + 'sites/MLA/search', {
        params: {
            q: query
        }
    }).then(resp => {

        logger(`Starting query: ${query}`)

        const data = {
            author: {
                name: '',
                lastname: ''
            }
        }

        data.categories = resp.data.filters[0]?.values[0]?.path_from_root?.map(({ name }) => name) || []

        data.items = resp.data.results.map(item => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: String(item.price).split(".")[0],
                decimals: String(item.price).split(".")[1] || 0
            },
            picture: item.thumbnail.replace("-I", "-O"),
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            location: item.address.state_name
        })) || []

        res.status(200).send(data);
    })
        .catch(err => {
            logger(`ERROR getting query: [${query}] , ${err}`)
            res.status(500).send(`ERROR ${err.name}:${err.message}`);
        })
};

const item = async (req, res) => {
    const id = req.params.id

    if (!'id' in req.params) return res.status(400).send('missing id')


    axios.get(url + `items/${id}`)
        .then(resp => {

            logger(`Getting item: ${id}`)

            const data = {
                author: {
                    name: '',
                    lastname: ''
                }
            }

            const item = resp.data

            data.item = {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: String(item.price).split(".")[0],
                    decimals: String(item.price).split(".")[1] || 0
                },
                picture: item.pictures[0]?.url || item.thumbnail.replace("-I", "-O"),
                condition: item?.attributes.find(atr => atr.id === 'ITEM_CONDITION')?.value_name || '',
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity
            }

            axios.get(url + `items/${id}/description`)
                .then(resp_ => {

                    Object.assign(data.item, { description: resp_.data?.plain_text || '' })

                    res.status(200).send(data);
                })
                .catch(err => {
                    logger(`ERROR getting item description: ${id}`)
                    res.status(500).send(`ERROR ${err.name}:${err.message}`);
                })

        })
        .catch(err => {
            logger(`ERROR getting item: ${id}, ${err}`)
            res.status(500).send(`ERROR ${err.name}:${err.message}`);
        })
};

module.exports = { searchQuery, item };
