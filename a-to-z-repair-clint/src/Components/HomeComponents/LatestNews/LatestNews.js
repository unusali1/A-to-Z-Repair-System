import React from 'react';
import { Container, Row } from 'react-bootstrap';
import news1 from '../../../images/news1.png';
import news2 from '../../../images/news2.png';
import news3 from '../../../images/news3.png';
import SingleNews from '../SingleNews/SingleNews';
import './LatestNews.css';

const LatestNews = () => {

    const latestNews = [
			{
				id: 1,
				title:
					"What You Should Do To Hire Best Repairs-Services For Appliances",
				time: "Sept 15, 2022",
				description:
					"What do you normally do when any household appliances stop working? Most people may start looking around for the best technical services. Repairing home appliances is the best solution as you don’t have to consider purchasing a new one....",
				image: news1,
			},
			{
				id: 2,
				title: "Benefits of hiring professional repair services",
				time: "Oct 10, 2022",
				description:
					"You have a critical decision to make when it is about your  repair. Should you engage a local handyman to check if he can solve it or employ a professional to do it? Sure, any approach could work, but you need to be cautious about making corners with your pricey appliances....",
				image: news2,
			},
			{
				id: 3,
				title:
					"Your Basic Check-List Before You Finalize Appliance Repairs Service",
				time: "Oct 17, 2022",
				description:
					"Appliances may break down very often. You need a team that can maintain and repair malfunctioning appliances. In most cases, people may want to settle by hiring services that are best within their reach. This may sound good, but certainly is not the right....",
				image: news3,
			},
		];

    return (
          <section className='news-container' id='blog'>
            <Container className="py-5">
              <h3>Latest News From Our Blog</h3>
              <Row className="mt-5">
                  {
                       latestNews.map(news => <SingleNews key={news.id} news={news} />)
                  }
              </Row>
            </Container>
         </section>
    );
};

export default LatestNews;