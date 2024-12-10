from datetime import datetime as dt

DELTA_ELO_RANK = 50

def get_delta_rank_name(rank, elo):
    delta_elo = round((elo - rank.elo_min) / DELTA_ELO_RANK) + 1
    return f"{rank.label} {delta_elo}"


def get_date_now_formatted():
    # ToDo: Add timezone
    return dt.strftime(dt.now(), "%d-%m-%Y")


def format_date(date):
    # ToDo: Add timezone (merge with get_date_now ?)
    return dt.strftime(date, "%d-%m-%Y")
