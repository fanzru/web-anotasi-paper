import {dataPaper} from "../types/paper"

const DataAz: dataPaper = {
  "paper_id": "paper_identifier",
  "sections": [
      {
          "section_name": "Abstract",
          "selected_sentences": [
              {
                  "par_id": 0,
                  "sentences": [
                      {
                          "sent": "In this paper, three methods of extracting single document summary by combining supervised learning with unsupervised learning are proposed.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The purpose of these three methods is to measure the importance of sentences by combining the statistical features of sentences and the relationship between sentences at the same time.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The first method uses supervised model and graph model to score sentences separately, and then linear combination of scores is used as the final score of sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the second method, the graph model is used as an independent feature of the supervised model to evaluate the importance of sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The third method is to score the importance of sentences by supervised model, then as a priori value of nodes in the graph model, and finally use biased graph model to score sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "On the data sets of DUC2001 and DUC2002, the ROUGE method is used as the evaluation criterion, which shows that the three methods have achieved good results, and are superior to the methods of extracting summary only using supervised learning or unsupervised learning.",
                          "tag": "Method"
                      },
                      {
                          "sent": "We also validate that priori knowledge can improve the accuracy of key sentence selection in graph model.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Introduction",
          "selected_sentences": []
      },
      {
          "section_name": "A C C E P T E D M",
          "selected_sentences": [
              {
                  "par_id": 8,
                  "sentences": [
                      {
                          "sent": "In the summary generation process of this paper, in order to make better use of the statistic features of sentences and relationship between sentences, we proposed three methods to combine them for scoring sentences, and finally generate summary based on final scores.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 9,
                  "sentences": [
                      {
                          "sent": "(1) The sentences are scored using supervised and unsupervised learning methods respectively, then the scoring results are normalized and linearly combined to get the final score of sentence.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 10,
                  "sentences": [
                      {
                          "sent": "(2) First, the unsupervised method is used to score the sentences, then add the scores as an independent feature of supervised learning methods to train the classifier, finally, compare the effect of summarization before and after add scores from unsupervised method as feature.",
                          "tag": "Method"
                      },
                      {
                          "sent": "(3) A two-stage model was proposed.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the first stage, we used the classifier that trained by supervised method to score the sentences in the new document as the prior probability of the sentence was selected to compose the final summary.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the second stage, the document is represented as a graph , and then the nodes are scored using a biased random walk.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the random jump, the nodes with large prior values are more likely to be selected.",
                          "tag": "Method"
                      },
                      {
                          "sent": "This paper conducts experiments on DUC2001 and DUC2002 datasets respectively, evaluates the effectiveness of the proposed method using ROUGE methods.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Under the ROUGE-1, ROUGE-2, ROUGESU4 evaluation indexes, compared with the summary generated by the methods of location-based(Lead-based), LexRank (Erkan et al2004), Latent semantic analysis(LSA) and supervised methods trained by Logistic Regression(LR), Support Vector Machine(SVM), etc",
                          "tag": "Result"
                      },
                      {
                          "sent": "The three summarization methods proposed in this paper all have achieved an improvement in effectiveness, which validates the effectiveness of our proposed summary methods in generating extractive summary for single document.",
                          "tag": "Claim"
                      }
                  ]
              },
              {
                  "par_id": 11,
                  "sentences": [
                      {
                          "sent": "The main contributions of this paper are as follows： (1) We proposed three methods to score sentences by combining sentence relations with statistical features of sentences.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The effect of combination method is better than that of single method.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Related Work",
          "selected_sentences": []
      },
      {
          "section_name": "A C C E P T E D M A N U S C R I P T",
          "selected_sentences": [
              {
                  "par_id": 18,
                  "sentences": [
                      {
                          "sent": "In recent years, deep learning has been heavily used in summarization, such as YousefiAzar et al, (2017); Nallapati et al, (2017);Yao, Kaichun, et al, (2018).",
                          "tag": "Claim"
                      },
                      {
                          "sent": "But it is not covered in the methods we used in this article.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The three methods we proposed are actually a combination of supervised and unsupervised learning in the traditional summarization method.",
                          "tag": "Conclusion"
                      },
                      {
                          "sent": "The advantage of doing this is that the model can use both the statistical characteristics of the sentence and the relationship between the sentences to evaluate the importance of the sentence.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Proposed Method",
          "selected_sentences": []
      },
      {
          "section_name": "Documents",
          "selected_sentences": []
      },
      {
          "section_name": "Graph Construction LexRank",
          "selected_sentences": []
      },
      {
          "section_name": "Two basic sentence scoring methods",
          "selected_sentences": [
              {
                  "par_id": 22,
                  "sentences": [
                      {
                          "sent": "We first introduce two basic scoring methods, one is supervised, the other is unsupervised.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The supervised method mainly introduces the features we used in the model training, the unsupervised method mainly introduces how to build the graph model and the principle of sentence ranking.",
                          "tag": "Claim"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Supervised method",
          "selected_sentences": [
              {
                  "par_id": 23,
                  "sentences": [
                      {
                          "sent": "Among the sentence scoring techniques based on supervised models, the most important issues involved are the selection of sentence features and the classification models.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The classification models used in this paper are Logistic Regression, SVM, NN and Bayes, we used these methods to train the classifier respectively.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Unsupervised Method",
          "selected_sentences": [
              {
                  "par_id": 40,
                  "sentences": [
                      {
                          "sent": "(1) Graph Construction Nodes and Edges are basic elements of graph model, we represent the document using graph, where the nodes in the graph represent the sentences in the document, whether or not the edges are connected is determined by the relevance between the sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "To determine the relationship of two sentences is key of constructing graph, here we use cosine similarity to measure the relationship.",
                          "tag": "Method"
                      },
                      {
                          "sent": "First, we pre-process the sentences in document, including stop-words removing, words stemming, to get the TFISF value of words, and then use the vector space model to represent the sentences respectively.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Finally, using the vectors we get to calculate the similarity of any two sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The formula of getting the similarity between two sentences is shown in (3-8).",
                          "tag": "Method"
                      },
                      {
                          "sent": "Where ⃗ ⃗ ( ) and ⃗ ⃗ ( ) represent the vector of sentence in the document.",
                          "tag": "Method"
                      },
                      {
                          "sent": "| | can return the module of vector.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In order to highlight the importance of nodes in the graph and prevent the appearance of a complete graph, we set a similarity threshold , if the similarity value is greater than , then we will use an edge to connect two nodes, this prevents two nodes with small similarity be connected, which in turn makes the degree of inconsistency among the nodes in the graph, so that the importance of each node can be better distinguished.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Three Methods to Combine Supervised and Unsupervised Learning",
          "selected_sentences": [
              {
                  "par_id": 45,
                  "sentences": [
                      {
                          "sent": "There are three methods to combine the scoring results get from supervised and unsupervised learning methods, following, we will describe the detail of these methods.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 46,
                  "sentences": [
                      {
                          "sent": "(1) Linear combination method In this scoring method, we linearly combine the scoring results of the supervised method with the score of the unsupervised method.",
                          "tag": "Method"
                      },
                      {
                          "sent": "Synthesize the importance of sentences using the statistical features and the relationship between the sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The score of supervised methods is measured by the statistical features of sentences, and the score of unsupervised method is measured by the relationship of sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The linearly combination method we can use the formula (3-11) to describe.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 47,
                  "sentences": [
                      {
                          "sent": "( ) (3-11) where the range of is [ , sup is the scores of supervised methods, graph-score is the scores from unsupervised method.",
                          "tag": "Method"
                      },
                      {
                          "sent": "If the is 0, then the final score is equal to the score of unsupervised method.",
                          "tag": "Result"
                      },
                      {
                          "sent": "If the is 1, then we get the score totally from unsupervised method.",
                          "tag": "Method"
                      },
                      {
                          "sent": "When combine these two scores, we should standardize the score separately, the method we used is shown in formula 3-12.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 49,
                  "sentences": [
                      {
                          "sent": "We use this method to map the scores of two methods into the range of [0,1], and sum of scores is 1.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In this paper, we use the Logistic, SVM, NN and Bayes models to training the classifier for predicting the scores of sentences.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 50,
                  "sentences": [
                      {
                          "sent": "(2) LexRank score as a feature of supervised methods In this method, we use the sentences scores from LexRank methods mentioned in section 3.1.2 as a feature for all supervised methods.",
                          "tag": "Method"
                      }
                  ]
              },
              {
                  "par_id": 51,
                  "sentences": [
                      {
                          "sent": "(3) BiasedLexRank In this method, we divide the sentence scoring process into two stages.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the first stage, supervised learning is used to obtain the priori probability that each sentence is selected as the summary content.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the second stage, according the scores we get, we use the scores as the prior knowledge for nodes in graph and the biasedLexRank to score every node.",
                          "tag": "Method"
                      },
                      {
                          "sent": "When random walks are performed on the graph, it is preferable to select the node with large prior probability.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The statistical features of sentences are integrated into the graph model.",
                          "tag": "Method"
                      },
                      {
                          "sent": "This makes it possible to comprehensively consider information such as sentence position, name entity in sentences when rank the nodes in graph.",
                          "tag": "Claim"
                      }
                  ]
              },
              {
                  "par_id": 52,
                  "sentences": [
                      {
                          "sent": "The biasedLexRank is a variant of the classic LexRank method.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the construction of the graph model, the biasedLexRank is the same with the LexRank.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The most essential difference between them is that the initial score of nodes in graph, in LexRank, all nodes are same, but different in biasedLexRank.",
                          "tag": "Method"
                      },
                      {
                          "sent": "We use the scores get from supervised methods as the initial scores of nodes in biasedLexRank.",
                          "tag": "Method"
                      },
                      {
                          "sent": "So that when random jump, it is preferable to select the nodes that have high score.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "We can formulate biasedLexRank as (3-13).",
                          "tag": "Conclusion"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Sentences selection",
          "selected_sentences": []
      },
      {
          "section_name": "Experimental Analysis",
          "selected_sentences": []
      },
      {
          "section_name": "Datasets",
          "selected_sentences": []
      },
      {
          "section_name": "Evaluation Standard",
          "selected_sentences": []
      },
      {
          "section_name": "Candidate Algorithms",
          "selected_sentences": []
      },
      {
          "section_name": "Overall Evaluation",
          "selected_sentences": [
              {
                  "par_id": 70,
                  "sentences": [
                      {
                          "sent": "get the best result in all methods, which indicates scoring the sentences from statistical features and sentences relationship comprehensively are more accurate.",
                          "tag": "Conclusion"
                      },
                      {
                          "sent": "When using the scores get from LexRank method as a feature added into the supervised models, we can get a better summary of document sets than before.",
                          "tag": "Result"
                      },
                      {
                          "sent": "Among them, the effect of SVM method has the most significant improvement, while the Bayes method has almost no effect.",
                          "tag": "Result"
                      },
                      {
                          "sent": "4-3, the results of summary generation are better than those using only statistical features or sentence relationship after combining sentence relationship and statistical features.",
                          "tag": "Result"
                      },
                      {
                          "sent": "For the first combination method, there are two kinds of scores we get when evaluate a sentence, one is from statistical characteristics, the other is from the relationship between sentences.",
                          "tag": "Method"
                      },
                      {
                          "sent": "After linear combination, it can evaluate the importance of a sentence more comprehensively.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "For the second combination method, new features are added to make the model better able to distinguish between important and non-important sentences, but in this paper, we have not evaluated the impact of each feature on sentence scoring.",
                          "tag": "Result"
                      },
                      {
                          "sent": "The third combination method has the most obvious effect on the improvement of LexRank method, because the BiasedLexRank method can choose the sentences with higher priori values when it makes random jumps by adding supervised method as a priori knowledge.",
                          "tag": "Result"
                      },
                      {
                          "sent": "At the same time, for those nodes with lower priori values but more degrees in the graph, it can also select them by iteration algorithm.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Parameter Analysis",
          "selected_sentences": [
              {
                  "par_id": 71,
                  "sentences": [
                      {
                          "sent": "In the first method, the parameter is used to balance the proportion of sentences score between the LexRank method and the Supervised method.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In the third method, the parameter is used to control the probability of random jump in graph model, if the value is larger, the probability of using the random jump to select the node is bigger.",
                          "tag": "Method"
                      },
                      {
                          "sent": "In order to study the influence of the parameter value on summarization, here we set the ranges of in the first method from 0 to 1 and the second method from 0 to 0.9.",
                          "tag": "Method"
                      }
                  ]
              }
          ]
      },
      {
          "section_name": "Conclusion",
          "selected_sentences": [
              {
                  "par_id": 73,
                  "sentences": [
                      {
                          "sent": "This paper presents three methods of combining supervised learning with unsupervised learning to generate single document summary.",
                          "tag": "Claim"
                      },
                      {
                          "sent": "The first method combines the scores of two methods linearly.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The second one regards the scores of unsupervised methods as a feature of supervised learning.",
                          "tag": "Method"
                      },
                      {
                          "sent": "The third one regards the scores of supervised learning as a priori value of nodes in the graph model.",
                          "tag": "Method"
                      },
                      {
                          "sent": "When using these three methods to score sentences, the statistical characteristics of sentences and the relationship between sentences are integrated, which can evaluate the importance of sentences in documents more comprehensively, thus improving the accuracy of sentence scoring.",
                          "tag": "Result"
                      }
                  ]
              },
              {
                  "par_id": 74,
                  "sentences": [
                      {
                          "sent": "The experimental results on two data sets of DUC2001 and DUC2002 show that the three combination methods proposed in this paper have improved compared with Lead, LSA, LexRank and the supervised methods under the ROUGE.",
                          "tag": "Result"
                      },
                      {
                          "sent": "At the same time, the best result obtained from the third combination method shows that the original LexRank algorithm is greatly improved after adding the prior value to the graph model.",
                          "tag": "Result"
                      }
                  ]
              },
              {
                  "par_id": 75,
                  "sentences": [
                      {
                          "sent": "Although our proposed methods have performed well, there exits much room for improvement.",
                          "tag": "Result"
                      },
                      {
                          "sent": "From the experimental results, we can infer that good priori values for nodes in graph can improve the effect of summarization.",
                          "tag": "Other"
                      },
                      {
                          "sent": "Hence, how to get better prior values for nodes in graph is the first future work we need to consider.",
                          "tag": "Other"
                      },
                      {
                          "sent": "Another meaningful future work is to use the proposed summarization methods for long documents, such as academic papers, audit reports, or books etc",
                          "tag": "Other"
                      },
                      {
                          "sent": "Last but not least, we would like to explore more text modelling methods to represent documents such as complex networks or neural networks.",
                          "tag": "Other"
                      }
                  ]
              }
          ]
      }
  ]
}

export default DataAz