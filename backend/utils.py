# utility functions for formating timestamps

from datetime import datetime, timedelta

def format_timestamp(timestamp):
    now = datetime.utcnow()
    if timestamp.date() == now.date():
        return"Today"
    elif timestamp.date() == (now - timedelta(days=1)).date():
        return "Yesterday"
    elif timestamp > now - timedelta(days=7):
        return "Last week"
    else:
        return timestamp.strftime("%Y-%m-%d")
    

