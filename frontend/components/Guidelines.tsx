import Link from 'next/link';
import React from 'react'

const Guidelines = () => {
  return (
    <>
      <div className='space-y-2'>
        <p className='text-2xl font-medium'>Argumentative Zoning annotation</p>
        <p className='text-xl font-medium'>Introduction</p>
        <p>
          Argumentative Zoning (AZ) is the analysis of the argumentative and
          rhetorical structure of a scientific paper. The basic idea of AZ is to
          assign each sentence in the scientific article to a specific category
          (known as zone). Each zone represents one of the article's component
          (e.g. the hypothesis, the background, the method, .. etc).
        </p>
        <p className='text-xl font-medium'>The task</p>
        <p>
          Given a scientific article and a sub set of sentences from the
          article, it’s required to identify the category of each sentence from
          the articles’ main components.
        </p>
        <p>
          In this work, we define a simplified schema of 4 categories that cover
          the articles main components. These categories are defined in the
          following table:
        </p>
      </div>
      <div className='mt-4'>
        <table className='table-auto'>
          <thead className='border-y-2'>
            <tr>
              <th>Argumentative zone</th>
              <th>Definition</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <th>claim</th>
              <td>
                Sentence describing the research goal or the hypothesis behind
                research work
              </td>
              <td>
                This paper investigates the incorporation of diverse lexical,
                syntactic and semantic knowledge in feature-based relation
                extraction using SVM (P05-1053)
              </td>
            </tr>
            <tr className='border-b'>
              <th>method</th>
              <td>
                Sentence describing the research goal or the hypothesis behind
                research work
              </td>
              <td>
                This paper investigates the incorporation of diverse lexical,
                syntactic and semantic knowledge in feature-based relation
                extraction using SVM (P05-1053)
              </td>
            </tr>
            <tr className='border-b'>
              <th>result</th>
              <td>
                Sentence describing the research goal or the hypothesis behind
                research work
              </td>
              <td>
                This paper investigates the incorporation of diverse lexical,
                syntactic and semantic knowledge in feature-based relation
                extraction using SVM (P05-1053)
              </td>
            </tr>
            <tr className='border-b'>
              <th>conclusion</th>
              <td>
                Sentence describing the research goal or the hypothesis behind
                research work
              </td>
              <td>
                This paper investigates the incorporation of diverse lexical,
                syntactic and semantic knowledge in feature-based relation
                extraction using SVM (P05-1053)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className='text-xl font-medium mt-3'>Detailed guidelines</p>
      <p>
        For more detailed explaination for the task, the categories and the user
        guide, please refer to the full{' '}
        <span>
          <Link
            href={'https://owncloud.tuwien.ac.at/index.php/s/lqyUgQmAbZg2cf3'}
          >
            <a className='link' target={'_blank'}>
              guidelines
            </a>
          </Link>
        </span>
      </p>
    </>
  );
}

export default Guidelines