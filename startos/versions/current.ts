import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.8.8:0',
  releaseNotes: {
    en_US:
      'Updates RoboSats to v0.8.8-alpha. A garage key replaces the robot key, and chat with your trade partner is now Nostr-encrypted. The Alice and Eleuteria coordinators, which no longer answered, have left the federation. Payouts are now checked against the Lightning node, and the order book lines up again on mobile. RoboSats also uses less memory over long uptimes. This version requires StartOS 0.4.1 or later.',
    es_ES:
      'Actualiza RoboSats a v0.8.8-alpha. Una llave de garaje sustituye a la llave del robot, y el chat con tu contraparte ahora está cifrado con Nostr. Los coordinadores Alice y Eleuteria, que ya no respondían, han dejado la federación. Los pagos ahora se verifican contra el nodo Lightning, y el libro de órdenes vuelve a alinearse en móvil. RoboSats también usa menos memoria cuando lleva mucho tiempo en funcionamiento. Esta versión requiere StartOS 0.4.1 o posterior.',
    de_DE:
      'Aktualisiert RoboSats auf v0.8.8-alpha. Ein Garagenschlüssel ersetzt den Roboterschlüssel, und der Chat mit deinem Handelspartner ist jetzt mit Nostr verschlüsselt. Die Koordinatoren Alice und Eleuteria, die nicht mehr antworteten, haben die Föderation verlassen. Auszahlungen werden jetzt gegen den Lightning-Knoten geprüft, und das Orderbuch ist auf Mobilgeräten wieder richtig ausgerichtet. RoboSats verbraucht bei langer Laufzeit außerdem weniger Arbeitsspeicher. Diese Version erfordert StartOS 0.4.1 oder neuer.',
    pl_PL:
      'Aktualizuje RoboSats do v0.8.8-alpha. Klucz garażu zastępuje klucz robota, a czat z partnerem transakcji jest teraz szyfrowany przez Nostr. Koordynatorzy Alice i Eleuteria, którzy przestali odpowiadać, opuścili federację. Wypłaty są teraz sprawdzane względem węzła Lightning, a księga zleceń znów jest poprawnie wyrównana na telefonach. RoboSats zużywa też mniej pamięci przy długim czasie działania. Ta wersja wymaga StartOS 0.4.1 lub nowszego.',
    fr_FR:
      "Met à jour RoboSats vers v0.8.8-alpha. Une clé de garage remplace la clé de robot, et le chat avec votre contrepartie est désormais chiffré avec Nostr. Les coordinateurs Alice et Eleuteria, qui ne répondaient plus, ont quitté la fédération. Les paiements sont désormais vérifiés auprès du nœud Lightning, et le carnet d'ordres est de nouveau bien aligné sur mobile. RoboSats utilise aussi moins de mémoire lors d'un fonctionnement prolongé. Cette version nécessite StartOS 0.4.1 ou une version ultérieure.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
