from unittest import main, TestCase
from unittest.mock import MagicMock
from .utils import (
    get_overwatch_hero,
    OverwatchHeroes
)


class TestUtilsFuncs(TestCase):
    @classmethod
    def setUp(self):
        pass

    @classmethod
    def tearDown(self):
        pass

    def test_get_ow_hero_ana(self):
        result = get_overwatch_hero("ana")
        self.assertEqual(result, OverwatchHeroes.Ana)

    def test_get_ow_hero_dva(self):
        result = get_overwatch_hero("dva")
        self.assertEqual(result, OverwatchHeroes.DVa)

    def test_get_ow_hero_invalid_hero_name(self):
        result = get_overwatch_hero("NonExistent")
        self.assertIsNone(result)


if __name__ == "__main__":
    main()