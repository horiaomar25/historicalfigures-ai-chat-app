import os
from dotenv import load_dotenv
import requests
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

load_dotenv()

class ActionWikiData(Action):
    def name(self):
        return "action_fetch_wiki"
    
    def run(self, dispatcher, tracker, domain):
        query = tracker.get_slot("search_query") # capture user query
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query}"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            summary = data.get("extract", "I couldn't find information on that topic.")
        else:
            summary = "Sorry, I couldn't retrieve data from Wikipedia."
            
        dispatcher.utter_message(text=summary)
        return [SlotSet("search_query", None)]

    
class ActionFetchHistoricalFigure(Action):
    def name(self):
        return "action_fetch_historical_figure"
    
    def run(self, dispatcher, tracker, domain):
        name = tracker.get_slot("historical_figure") # Capture user input
        
        if not name:
            dispatcher.utter_message(text="I couldn't understand which historical figure you're asking about. Could you rephrase?")
            return [SlotSet("historical_figure", None)]
        
        api_key = os.getenv("API_KEY")
        
        if not api_key:
            dispatcher.utter_message(text="API key is missing. Please check your configuration.")
            return []
        
        # Fetch data from API Ninja
        url_ninja = f"https://api.api-ninjas.com/v1/historicalfigures?name={name}" 
        headers = {
            "X-Api-Key": api_key
        }
        
        
        response_ninja = requests.get(url_ninja, headers=headers)
        
        if response_ninja.status_code == 200:
            data_ninja = response_ninja.json()
            if isinstance(data_ninja, list) and len(data_ninja) > 0:
                figure = data_ninja[0]
                info = figure.get("info", "No details available")
                if isinstance(info, dict):
                    info_str = "\n".join([f"{key}: {value}" for key, value in info.items()])
                else:
                    info_str = "No details available"
            else:
                info_str = "No details available"
        else:
            info_str = "Sorry I couldn't retrieve information on that figure."
        
        # Fetch data from Wikipedia
        url_wiki = f"https://en.wikipedia.org/api/rest_v1/page/summary/{name}"
        response_wiki = requests.get(url_wiki)
        
        if response_wiki.status_code == 200:
            data_wiki = response_wiki.json()
            summary = data_wiki.get("extract", "I couldn't find information on that topic.")
            image_url = data_wiki.get("thumbnail", {}).get("source", "")
        else:
            summary = "Sorry, I couldn't retrieve data from Wikipedia."
            image_url = ""
        
        
        card = f"{name}\n\nWikipedia Summary:\n{summary}\n\nSummary:\n{info_str}"
        
        dispatcher.utter_message(text=card)
        if image_url:
            dispatcher.utter_message(image=image_url)
        
        return []