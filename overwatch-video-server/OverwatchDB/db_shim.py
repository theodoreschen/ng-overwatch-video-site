from abc import (
    ABC,
    abstractmethod
)
from datetime import date
from typing import Optional
from .utils import OverwatchHeroes

TODAY = date.today()


class AbstractDBHandler(ABC):
    @abstractmethod
    def __init__(self, *, db: str=None):
        pass

    @abstractmethod
    def __enter__(self):
        self.open()
        return self

    @abstractmethod
    def __exit__(self, *_):
        self.close()

    @abstractmethod
    def open(self):
        pass

    @abstractmethod
    def close(self):
        pass

    @abstractmethod
    def insert(self, entry: dict) -> tuple:
        return ()

    @abstractmethod
    def fetch_by_dates(
        self, start_date: date, *, end_date: Optional[date]=TODAY
    ) -> list:
        return []

    @abstractmethod
    def fetch_by_hero_name(self, hero: OverwatchHeroes) -> list:
        return []

    @abstractmethod
    def fetch_by_tag(self, tag: str) -> list:
        return []

    @abstractmethod
    def fetch_by_url(self, url: str) -> list:
        return []

    @abstractmethod
    def fetch_by_multiple(
        self, *,
        start_date: Optional[date]=None,
        end_date: Optional[date]=None,
        hero_name: Optional[OverwatchHeroes]=None,
        tag: Optional[str]=None
    ) -> list:
        return []

    @abstractmethod
    def update_by_video_url(self, video_url: str, metadata: dict) -> bool:
        return False

    @abstractmethod
    def delete_by_video_url(self, video_url: str) -> bool:
        return False