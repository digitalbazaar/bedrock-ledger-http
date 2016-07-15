/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
 /* jshint node: true */

'use strict';

var _ = require('lodash');
var helpers = require('./helpers');

var data = {};
module.exports = data;

var identities = [];
data.identities = identities;

// all mock keys for all agencies
var agencies = {
  'cbp': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjTkOVfJrhIX9dgjUUiAL\n' +
      'jj+KOTvkUm9OYJcAduHDlMRUB+l3kJFn/k2Hc7qWDimnZrGIxkOh/IOpD5KRy3XL\n' +
      '8bDnnb9QS3qeYfD7eHRsn1L5jB3uiI5s6rehAoxyHs/ZKn+J7vu46UZz7SHnLje/\n' +
      'Idw7j2vpwlYOI9PYwlc0hb8EeHk8rXVw3nG3j1AjYPPNRYK96yHZnlRuB/xYCyBC\n' +
      'rpkI4zBp5CMTgee8IZ2hrJydl0vUOg93KzAQ7tlsY2ba1wiUwrfDfCfGG4MOUk6R\n' +
      'xVG72G97dv+WaxxvN22qjedlflGnzxT51L2UICn9W4LPBhXIpy5266RsIeTrYTgL\n' +
      'FwIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEowIBAAKCAQEAjTkOVfJrhIX9dgjUUiALjj+KOTvkUm9OYJcAduHDlMRUB+l3\n' +
      'kJFn/k2Hc7qWDimnZrGIxkOh/IOpD5KRy3XL8bDnnb9QS3qeYfD7eHRsn1L5jB3u\n' +
      'iI5s6rehAoxyHs/ZKn+J7vu46UZz7SHnLje/Idw7j2vpwlYOI9PYwlc0hb8EeHk8\n' +
      'rXVw3nG3j1AjYPPNRYK96yHZnlRuB/xYCyBCrpkI4zBp5CMTgee8IZ2hrJydl0vU\n' +
      'Og93KzAQ7tlsY2ba1wiUwrfDfCfGG4MOUk6RxVG72G97dv+WaxxvN22qjedlflGn\n' +
      'zxT51L2UICn9W4LPBhXIpy5266RsIeTrYTgLFwIDAQABAoIBAGmmhrAL1R3ms9EL\n' +
      'F/R8nsiDhp/8y3pUZPlj3mgRzCTOn+LvaZCRB5C7ZZtRupLL3L26EY3p6RSlVuQc\n' +
      'jc/9x16ALzbXenWNPVIeW7Movl6PT7vgZKRqkNckG2NxuKqOanQdyA4u6Y4zM+Ty\n' +
      'mSX9dJMbVL+eRtopURjCkwYJAXUQadTmbNo4SuadCmD9ZjPDF4DDLiTknkrvl/UR\n' +
      'Un7gPHJYGzJM5aVoQisKA0FcF4d6S5B+KJZOvcWlQk9pfqugL3TktzEkgwI5+L5u\n' +
      '/LWWVAm3V7pAUU+qVe52kJn5mVlGs6d/A+4+TWN93J/af6+ko8rrUJwp7g4udivB\n' +
      'S1iqFtkCgYEA5hDONhcP776w2tXZB7JhEpJp1uwfUCNyVtwfSFl8mA41/uBGSW+O\n' +
      'N8Rtqpe82qRSOEfbR7BDo393qDvv/lD9sT78b+dnEywEy7DBAZjSnzOa0fJqj3oo\n' +
      'D6V0spQYeLiwBMGC02wygC9OZqwJcYyWyhsmFLLJi3gACp8jj+KQ/T0CgYEAnSRw\n' +
      '8wuvHXQG7Z7qZUgsvQIamuDQ2BB8v7mg1we92aMQBBqWgEmRbhwuf2Ztmrsmi57u\n' +
      'gnViT/gqrKAzCR2TLGW9BLg/9A6M/Qk6mGzhfXP2AxADw9R4zUsZ5a+Tb/Er4s0z\n' +
      'Grjun0B3fqCCJZ1DxeMlPDW2CyEe03t6vh85VuMCgYEA0tMjpL2NhQ0h0+eTclIs\n' +
      'UnCJPMI0D6Pr61zb7djTLCQZpu6uei0YDlKajHFwRou+LITslM0ZroHojOogCtT9\n' +
      'JaeqfIF5G0CDRIU82NHKcMlBXpLew4wVmgDs55h+tGHKKxGJaWUFAiJXng6YuM00\n' +
      'gRBP3TfZKU1V/GXImNnuM6ECgYBdmgBBdVs4ow0ha0BZVfV4HBG24WTk3mVAWpTI\n' +
      'oM7gHTYEC8ZL4gZjXRwBPQTaXtHl5qRRRxRpZ/wbWU0tB9XLY0qEzi8h86zdaCrj\n' +
      '8i8aaAFI77geZKgUOMDTRJMA4dnvPaVMLI3OhDrpTThYqWVeMR/TznaCCJdxByMk\n' +
      'rjqcWwKBgBXI8dSlZjOKPr1JASDEaC7lVym0IPaU0Wn2cWZA3t4n9dr2gUG+Wl9h\n' +
      'xwirvJsq4q+W9WrdNuRzI3eqpDgByT4nm3sCh6Vdb82+hhjODqNZ7edMLxBdcN4p\n' +
      'L+PCf2MTBImCJgNbLOdSYYmcHTV2JT94hn1UG7HajSMFAQlDNbvt\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'ice': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk7XYBIrYGhse8Lqq90u8\n' +
      'rkcjl0MKmlgqAvUQOBqNZrTyEa8EhIjau7PeDRWvmRiRIUPr6qRzdVP9oLx10lbT\n' +
      'EQBXhQ68B0C6z3/q/xKLnZhX1ZAnspWSeckLB242EMKppvSx9eEzp8qTTA2W2p+N\n' +
      'GXXQhuiZ6MYW/LqC034eYicuKCMEeoHFYR8d+Vic4RXh12HKl/aH03GvffU0Jwbt\n' +
      'KQuMpoXDjegou0JRj/99oGYHQHj+QUyQS6JgsobfoNeAR6ZIALIpwekGciOmnPdo\n' +
      'KhTNfEq22WANd56+yqcZ5k1XCX6kIOZNw5s+0jFDc4J+JeKxgh+Mpv2xQov78Q/l\n' +
      'GQIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEpAIBAAKCAQEAk7XYBIrYGhse8Lqq90u8rkcjl0MKmlgqAvUQOBqNZrTyEa8E\n' +
      'hIjau7PeDRWvmRiRIUPr6qRzdVP9oLx10lbTEQBXhQ68B0C6z3/q/xKLnZhX1ZAn\n' +
      'spWSeckLB242EMKppvSx9eEzp8qTTA2W2p+NGXXQhuiZ6MYW/LqC034eYicuKCME\n' +
      'eoHFYR8d+Vic4RXh12HKl/aH03GvffU0JwbtKQuMpoXDjegou0JRj/99oGYHQHj+\n' +
      'QUyQS6JgsobfoNeAR6ZIALIpwekGciOmnPdoKhTNfEq22WANd56+yqcZ5k1XCX6k\n' +
      'IOZNw5s+0jFDc4J+JeKxgh+Mpv2xQov78Q/lGQIDAQABAoIBAEhvIhGILNUQe6m9\n' +
      'QF2o7EviYteobqill2R/3IZGrxSwowx88RA1NF5bpAZynfvLik/vyN716hCdMYED\n' +
      'KhwNq89ohYKgaSB9Y56hshGHfKO5s0jtOipfIsdKCXiJWUX6z8spr6NN3lDoDDd9\n' +
      'an6nQ0A7ABlIM0Fs8pTYuZMRA8FJiQIsrSydkq4ZQAi/k00i0VXxzgbacG/VabA1\n' +
      'SxLe5hbjphw9CLC9hwscEP30JgC2cRvh8927C949VZT8EYvahskZ6pujbtBBrKCs\n' +
      '3Uof6+WJjIkK4MMbqhJBxIq6vEkXjt5wBZBN9k70Lq7ZxLdsL0Pma1FYRbp3HknV\n' +
      '56cUfAkCgYEA3bb1mNZmPRlGCvGulNXuIWoiK2Df6Lyr9FqCPdna4fgTuqBQeDdK\n' +
      'vVP2/9WB3BiPncaBB2N8WJJhWEnkCKtV2VWnRZD6ZvhXf3G4OfvFoI672veQ2BCR\n' +
      '8r6SElGxdQJtPCO6eUVVScg3B9p3wb2RMYMDZ8/yWZGr7hNfTQwQ8GcCgYEAqo1E\n' +
      'TZGCgH4smd9YXgDQnqFh8Cw8RdLf2KFcuk2J5zxsu3NUFQOw1220p/r4t23l2dJE\n' +
      'b8FyyKgF0VDWZ7IJbfIymO1NzFk/uqHW7dMY+XnhVad6FTjEUCxIJ6Ilz/AYkN5q\n' +
      'NBA5IjZZaouEA0lQ2YxAlib0y1EeZNjz7I6FDn8CgYEAyVvgsW4GbHcHpejZJVMl\n' +
      'cjNx1POmZzjy8nlAz+uLXq5vPI9chdGxj0EykibWSY4E4MXnaU5xH//RaN2yvCzf\n' +
      'SwL/Z67Du8DPtm8RYZfHZIo9EiDE63YhFtT81KZdBGevzW6lbH4Ld3beg8NmAA6q\n' +
      'Ts0typqQ/8fM3eu6Ib9TowECgYEAmyyk9J5rylUCZ43abMz5Axt6bHcS78SJfiRy\n' +
      'pd9elVFY7MRlwCj3gUqDkEK8gMgw1RqGwdeUhBS8FlIigX5vLeWrO5DNtBuP7FLL\n' +
      'pt7mXjYSW0hhv2VC2F8x1z2kgajF8SksH+qS0Rn6CQKfPg46zXTaXsNa/pHzwXXT\n' +
      'mWuijCkCgYBtR/gN8ZV6s2ixQQO+TgNJ6xqQ6tv7DV0EROuSAxSKX0xmYl5CwUbA\n' +
      'E6lZcZBxIOYP2VgBofK0TXG/uslfa8J0MmJzRUuZ20ZRSNz5H4VatH+4KSwbF4fV\n' +
      'qIfUohoKvmDW+w9AlyqKV3VNft4WUu/mzd6OIEUOZRHeO/xW2tgYjw==\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'cis': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkplZZv9AWqauGzM1/TLQ\n' +
      'cZFwiC/noQ2smDHx9+Velw2b8MGNjJFBc9RkqRceBdYig+B7h8iPQsb/psmg4WmX\n' +
      '1iEbQUHf7LGGuzWLUHKsDwFezckPymOyjKqE2GQMWbG8cG+vKOTfOQwpABgwkynA\n' +
      'vk8qOAS4Td2h/PGJgnD3vQAyiu+YeLRxcdN1Ums5pIqMVJFJgIhUQmnO1AomKqtU\n' +
      'sqQhh3+7iWvUwTse7HgOZmZyf5Lah5nsnv0miQ0oWWFf7bN5XmCO0A7g8KzhO055\n' +
      'jJxmpHHjKxzjIzrwFWUiytXZ9op5mvJUJAB5OSe/U+2Ata1BI04fWTBnJ3beLGdF\n' +
      '1wIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEowIBAAKCAQEAkplZZv9AWqauGzM1/TLQcZFwiC/noQ2smDHx9+Velw2b8MGN\n' +
      'jJFBc9RkqRceBdYig+B7h8iPQsb/psmg4WmX1iEbQUHf7LGGuzWLUHKsDwFezckP\n' +
      'ymOyjKqE2GQMWbG8cG+vKOTfOQwpABgwkynAvk8qOAS4Td2h/PGJgnD3vQAyiu+Y\n' +
      'eLRxcdN1Ums5pIqMVJFJgIhUQmnO1AomKqtUsqQhh3+7iWvUwTse7HgOZmZyf5La\n' +
      'h5nsnv0miQ0oWWFf7bN5XmCO0A7g8KzhO055jJxmpHHjKxzjIzrwFWUiytXZ9op5\n' +
      'mvJUJAB5OSe/U+2Ata1BI04fWTBnJ3beLGdF1wIDAQABAoIBAQCKDdmwcg4TkEYD\n' +
      'nW1pXTII0TMNPTe/ZlY0GUzJ63nxfEJvLobzalMeFlUZG4kNbAOi94K9czTeaPKW\n' +
      'Cej0ffEcGJ9HDBcpGmFL6XehseuwUdUKrB6vtMWPTIHAGi+7Q/K2W6azNx2z5myy\n' +
      'BxWvcLFvRrP2fxNlWKNUxc1+Ro42sA0C1qjvVgqTiqfV2lHkOyXefvUuJo5AtGEI\n' +
      'Ehd2PaTE1TXn//MGXFYPWI3UTkZg0K7QqMHzY/rZC2i3JlPz5Bj2fhrXjI0b9SS1\n' +
      'LmqW66b5bZcMzx3QDR3OBqXWHMRfP8tU82SIwXC01fLZvEeLO+H39BIn6NZxBRmI\n' +
      '1k8Fb7PJAoGBAMQV6+Bay0CY4VYsCPiVKa2DGp50BC9TIi8i95ZNjo0ufJscmNYA\n' +
      'q7QbEI49kSh5rQ/j7kfTEHSgphwu+5Rcb670o1HHvHE9CiHP9DfpGAG78n6UdUya\n' +
      'xF9ScGtlnVeBifC1Pq5G2SrYhGQ4qhrwZU7MG2iMI4Vyyd2YSEXD/QcFAoGBAL9k\n' +
      'hPmTbmDSBZlVnsUWaLa5t5ftI07vl6fenu1KhurfG19jdPoOmYZauHQzIE+7CzFh\n' +
      '9XjzK+sto2BeugW7kEw0NFtQpHxxx6Pg5FUHaEgIyqgnMJBP6muR9LD1eNkWJsOC\n' +
      'd0Vuer2DUmeSmBNyzZTQIUyBZu1/qmZgY7PMRjgrAoGALcY8SSSI3CyUNeyTr4wK\n' +
      'rbG0ThchPvb2PPC5wYGbbIPUnNUhLJv9eU70H3Bp6Xv2FYaNAoFYDxHNlTi2jBzE\n' +
      'CaCcW6P37qtkKR6FkWO9sfHxGvGHLHnYq7PwAHI5N8tKq0F0P3TUj3b5+PdtZlqG\n' +
      'G83z/ATy6d0xGKTLAlZNRA0CgYAkDhGm2ok+oBIB8sk4I6KSWaYmbrvqEOSm8R9L\n' +
      'YHDOKj2D2L6epMVzM//vk/oQSxIuuV9+64Boi25tpyqwDcd/M45xbV2vO9f6HVGm\n' +
      'WwDgIRfcWZWieguVPCe2dmfPrYab6iYB5HAm52hMrqcLcuMbl6HOQcpcD2LQanQd\n' +
      '2OuZhQKBgGFwzGCkoi79UBpLxzXDnGUTeWaxD9s67r1O03MhPv7cU1k3bogzC6kX\n' +
      'hV52XUh0qR90vL0MCDFj7tX2XI8d0UMGsqo7T+Ptdcoam3Il4mp4fV32Mt1EDf7B\n' +
      'AQFxwvC51PuL6KqqZCF29GEQI17V38od7BjJ5yEUulBvrG9jG513\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'tsa': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnp81cRZTi9AqcoqyxFwF\n' +
      'HKnSRAEGOzzORab8Sgs22ndNjNzD768J4fC3FrEj+UuK1dffWRJP4RY7NJUkIEhB\n' +
      'nufiM8lY2E3tI1kBA2rbrkF3Sa9IJtQpqmIY/WAJNUwC/L8du22JkYo3lReXLNWw\n' +
      'HG0A3JQ18PeLikYg/izxgc5Cq/XNdz8RPM0J8VhlaXQtwsFmohF5tbmbFRirwCKq\n' +
      'FMb8SOAXFPYHB5UUToYUCuIo/pfaSN3bis5ecI4f4OQIxMkFj9ZSiTFM1CBBATVT\n' +
      'v0nUo1ApJqa+fPSs9BqyQGP7sqxtXVyraasAN4a0P3F9XQaJhW2/Vcj1IP1oxRD4\n' +
      'UwIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEpAIBAAKCAQEAnp81cRZTi9AqcoqyxFwFHKnSRAEGOzzORab8Sgs22ndNjNzD\n' +
      '768J4fC3FrEj+UuK1dffWRJP4RY7NJUkIEhBnufiM8lY2E3tI1kBA2rbrkF3Sa9I\n' +
      'JtQpqmIY/WAJNUwC/L8du22JkYo3lReXLNWwHG0A3JQ18PeLikYg/izxgc5Cq/XN\n' +
      'dz8RPM0J8VhlaXQtwsFmohF5tbmbFRirwCKqFMb8SOAXFPYHB5UUToYUCuIo/pfa\n' +
      'SN3bis5ecI4f4OQIxMkFj9ZSiTFM1CBBATVTv0nUo1ApJqa+fPSs9BqyQGP7sqxt\n' +
      'XVyraasAN4a0P3F9XQaJhW2/Vcj1IP1oxRD4UwIDAQABAoIBAQCMCT5jAjTr3/E5\n' +
      'gh1koWCZ94r8InNf5MSuVUeyDsh0gpLiYxxQBBYTdDIPRH/f3MNLGvPBbRs8OiY2\n' +
      'u9xS67eTFGBtG7rl65YJeNAeNj6PTpiDYs2uCexm0YgCWMCIXvzcKdWT3JZw+Lct\n' +
      'VtBN8rExx0HVertMax60CkmiXAcycoQeVFDeKMDoo8Dol6G4TmxRcwATt2EBEnKt\n' +
      'qBl6Pvus+hdRu1KIFRISfQbcZI8ZM0/Nm48v0pPUqAd24qVwmtgESSbFMDG1u4tc\n' +
      '7x+3+A0+VqYRmO2BJSF32UlJV8vUcgvRByhGQXtVTq8DPV434Km9jndJr7yk/Vej\n' +
      'Cpmo2IQxAoGBAM5EbfJ+X7g9M0MXvsBqqV67+FqXyAs7En8o6Hw32RmLwNOwPK02\n' +
      'SAspCDQCPVsBDpCm4gId3XMw0E2MZCcOcWBeGuhQY7OMvl40rSA2N1kE+lgeSnIC\n' +
      'zVac5dypoibaYMkz753WSyWOeyhi7nU1ZlIGt24AMCDniBKJfG61XdOlAoGBAMTd\n' +
      '7ocmYsWicRJ7p3TxsdeaHFaZznEEUGxDtnWOEp6z/PsIQEh3b+oeo/wEM1zrMo1N\n' +
      'tGO9uSVpC6830MCbKBCRydxfWpdii8st8nK/94pnCh2FlZKi9QNBQTSBgiiRqFT8\n' +
      'FTe/crdNZS9Zkht1sN1G5IhAJCY123PFXA37wvqXAoGBAAmzOiBvRP0bE7ASC8xs\n' +
      't65W1KUeAjBVBNeqCtTco38KDXVnElNq/BRaR6J6gHwpHpA66OIEmYdzQjiDY6pa\n' +
      'iYZopodKUIX/FmzDuWiMZCnxi/xc4E9gRlvOYRjxeUiueGK96ITZsQsBGlWZ4XDt\n' +
      'o/QzkKjBpYHGoaWNhaaHLPRpAoGANj0O4p1oyRqgHH+E+2s7nDMRa6qkfe66WZmu\n' +
      'Q2UJLEBaiq8TRuPhKZeXhm+B1y/Vlai68l/rCquOVJAEK4yT1TzVaKm8w8iayze1\n' +
      'fHf3M2KAHvIW63eKGYN4+4ZS3eqDfiaVke5lJKtmHU2IO5iJSe2mOQOy8fQUqijN\n' +
      '2+xpI7ECgYBukHbBJHeKMD9rIx/ySrRduWUYDaKJ+D8mSa+0s1J84jCx1B+1Zxgj\n' +
      'KFvIdOhasn5ywAkD2fUQPqLUPHwWQpMDMOa/yunJF1HQF8OQB8GBep8ARBOfo7J2\n' +
      'p6nOJ5tuJj+iiNAv9HYdiexd4RD0/815CrX9f8jBMouQOt8qnAlxWQ==\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'fletc': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwXnANTX+eYwyyQOeDfHQ\n' +
      '+Wn/lLI+NbqQU5x3bw5xXBhhxtKryfWCMOcN3hgBBDTrdUoHQy1hmDRnXQm3zUJO\n' +
      'GApwlytkM9ftsA8lS9O6VhJKhKoqjcvdM9LPRlbOx8WIFJgBsKhzF8KcCF05uCVm\n' +
      'B/SLZTWI9seVKh5rvVf6I5Q3NJrlNLnJzm72KaUOg8ggde/CBQUzHnEeWkjUzTd9\n' +
      'znf1kLAXtGS2xQfwGO+PY6aFLmHFXppjKl6xm1MkADCjdkdwAdS+DojTy4VG/p64\n' +
      'RnzJBPDGYXqePz8u+JWNL1TFzyJN8U1nIBvs+D+yYl0rA4ifjDeiR4+H94QbuGRN\n' +
      'BwIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEpAIBAAKCAQEAwXnANTX+eYwyyQOeDfHQ+Wn/lLI+NbqQU5x3bw5xXBhhxtKr\n' +
      'yfWCMOcN3hgBBDTrdUoHQy1hmDRnXQm3zUJOGApwlytkM9ftsA8lS9O6VhJKhKoq\n' +
      'jcvdM9LPRlbOx8WIFJgBsKhzF8KcCF05uCVmB/SLZTWI9seVKh5rvVf6I5Q3NJrl\n' +
      'NLnJzm72KaUOg8ggde/CBQUzHnEeWkjUzTd9znf1kLAXtGS2xQfwGO+PY6aFLmHF\n' +
      'XppjKl6xm1MkADCjdkdwAdS+DojTy4VG/p64RnzJBPDGYXqePz8u+JWNL1TFzyJN\n' +
      '8U1nIBvs+D+yYl0rA4ifjDeiR4+H94QbuGRNBwIDAQABAoIBADsLzjYvGU+9Es64\n' +
      'NOdqkm1cBS07TLMXEe8ChIy3Kq+BnW2RY+5J6AbGrTvHtZ+0CtwL0LWWxv8tlxIU\n' +
      '4ixZfP3nSb9I9dbAooClzqsanfagtG9Sg5Qs0IB9aNa9rXPYfBRU48cnUaDBut7u\n' +
      'nKvvdfkdj+E+emNeO87T4+uwSt3KWUYjXIbxRVwxuQjfsbvnzqV4hLIOeM/RqYmJ\n' +
      'kLzTaCJwNZ2cNprPoIIkJxKek8q3Rjifo+NMbD7tqvSztCqLzwq3yizDaL8vq7iA\n' +
      'ibQ+gHLi5zGU5Hpu51BWzsZbwAN3nsGRImZgLbKCpFqiduXvbU872I6sgyXJOitd\n' +
      'Y57ctJECgYEA4mAbobdU/xOaudDuMYTq0lB9SH3Ma5b109GG9IFAJodC35VPgJPV\n' +
      '1fRYkeRAOUoxApiK/FzMpOZ9I0CQ39H+96vGUBmxfGYbPOp33blviTPK3jF+L3dZ\n' +
      'UTLnopvAXzmnHO1mudQtHzfpydWdKMwQD6KUxBUazrAnMrAyNkfCXr8CgYEA2stz\n' +
      '4GFnc0dTmWcuWa3jiA9QoY6n9NKLNYCXC8Vq3lOAzmJ3La+Msr2N6GC4HIYwUUvZ\n' +
      'AXc/I3peerPpJwh5gZ+KAj5cCmvKy6YOjDcdfH3Lp+ENXxRgOdIKEoK2TX6ZCX0r\n' +
      'aDFQ6uKfsE8GgaV6Ichh2EjNupCbNg2qGMmsa7kCgYEAw2fIkkiJgwFuLvWNlosw\n' +
      'k8jMzFViroCJxIT55HbpZBif/hWJoeh6zgv0pEKNuaY0NhRs7LhCIhmfbV2fcMR5\n' +
      'PVs2fRAgp8wPuP5/55HZGGrvs+qvDNQN8kxprHCbltdSTGMUqFXheTAvi3zsAzpa\n' +
      'ptRla/j3wfBGdbeoMDizLEsCgYBJoWRKo5zz35ITsvSXO3yx4i2JYP/G1UAB7ldm\n' +
      'n7ZaQZG8YsimuEhKMp5aEIqFFueVxEewRZga8WhwNLGG8EQryivgm2nQG/xwUl7c\n' +
      '8wNaTN9HjOY6FBpZ+wRmvFRreeo4lkYQV2Ba249P/xg6cxzJ16yN49pQKbACHdEb\n' +
      'bGs5CQKBgQCd4lhjxv/sjrxaUatC7P83w9MaJKy1lSM6Oou5u88dylkpUuNqVyVJ\n' +
      'g575R3HCP5LODXeuVNmK5SmXcK8IPbuCDO7SsCsClSTzOfnLcP4i480vHsd9CPci\n' +
      'AHrkMHGmGwGNOx2yWnWUNF/0jWJ899v0+VrbR3JZtRqM3gpE6ZIvaA==\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'fema': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskcRISeoOvgQM8KxMEzP\n' +
      'DMSfcw9NKJRvXNoFnxS0j7DcTPvi0zMXKAY5smANZ1iz9jQ43X/EUDNyjaWkiDUr\n' +
      'lpxGxTFq9D+hUnfzPCW6xAprzZaYhvuHun88CmULWeyWLphISk3/3YhRGnywyUfK\n' +
      'AuYYnKo6F+lDPNyPhknlB2uLblE4upqY5OrvlBdey6PV8teyjVSFo+WSTqzH02ne\n' +
      'X0aaIzZ675BWZyBGK5wCq/6vgCOSBqePflPXY2CfwdMVRe4I3FRnqEsKVQtZ2zwi\n' +
      '5j8YSZKNH4+2SrwuGqG/XcZaKCgKNMNDLRErZkdSPGCLM+OoPUOJEKdCvV3zUZYC\n' +
      'mwIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEpQIBAAKCAQEAskcRISeoOvgQM8KxMEzPDMSfcw9NKJRvXNoFnxS0j7DcTPvi\n' +
      '0zMXKAY5smANZ1iz9jQ43X/EUDNyjaWkiDUrlpxGxTFq9D+hUnfzPCW6xAprzZaY\n' +
      'hvuHun88CmULWeyWLphISk3/3YhRGnywyUfKAuYYnKo6F+lDPNyPhknlB2uLblE4\n' +
      'upqY5OrvlBdey6PV8teyjVSFo+WSTqzH02neX0aaIzZ675BWZyBGK5wCq/6vgCOS\n' +
      'BqePflPXY2CfwdMVRe4I3FRnqEsKVQtZ2zwi5j8YSZKNH4+2SrwuGqG/XcZaKCgK\n' +
      'NMNDLRErZkdSPGCLM+OoPUOJEKdCvV3zUZYCmwIDAQABAoIBAQCMdIMhXO4kr2WM\n' +
      'chpJVGpXw91fuDFxBCkMvVRqddSf1JZsLJMTFBBtXyI7z4Mf5fm6wn/+une/PBlH\n' +
      'UbZj/Yf+29bB62I5VpxRreE7hPo1E4TFb51x01+m5jE2e09LJKNZyG5D5FnufkRv\n' +
      'msdpfR7B0+iWHWMxjXyEybxl73f6tEZcsfK/O46rtVsD/e8szyugg6zrrYWX8BA4\n' +
      'sIRHzLvOZIow5eNbkAFfxXbIRLxjxFt2zSFM3a0GjKkU/7Jb8XoNszHc0eFVS79y\n' +
      'PwQDeoqUP7sHLoHqazhFxI1KJftA/9NE6Nw+U/XJvQRyEaJxAGYgXvvRXhVtEN/H\n' +
      '0y4/tbJZAoGBANvph6zmm49ExBXIg5K6JZw/9vM5GdJpmOTglQuLZGYJ9zwcAiqq\n' +
      'U0mVGsJW0uq5VrHyqknc+edBfYD9K76mf0Sn9jG6rLL1fCl8BnLaF21tGVHU2W+Y\n' +
      'ogcYXRkgYgYVl6RhvRqEsMWSEdr0S0z240bOsUB5W1mA601q7PwXfWYPAoGBAM+I\n' +
      'eXxuskg+pCrWjgPke2Rk7PeEXrWPilSMR1ueA5kNCNdAMmxbDqDD7TKmKsyIfEEQ\n' +
      '3VcWLGVY4vj0yW+ptsw+QFlt8PSjCT2z1heJW9AFEA/9ULU0ZpVdgy+ys9/cXSfq\n' +
      'hZC4UQVwL3ODZE+hIU8pEJw1wTEMUvUBlxkOb4a1AoGBAI/6ydWt9lNK1obcjShX\n' +
      'r6ApUOnVjM5yTKQtVegFD2qvQ6ubOt/sPDOE58wtRFJhnh1Ln6pUf1mlSyJUn3tn\n' +
      'TxQIU+wjKEbS6sPOa/puR8BhGZ62GNYzvIGgtfNpfEQ3ht0dEM536bSw+fe80kBF\n' +
      'tG/7i5mG2wQyn9xEEXzLdFKJAoGAQA7rGNp+U0hqmgJyAYeUAtAYSOpl5XryAtjt\n' +
      '6byjdamNUguxxLpykHMJkzmxOkLiv566A3iHqZy/KoM8bigfkXmhmTkTSB/O6WnK\n' +
      'KqeuXE5Dv/u73sLW60HbDW0GkpHNe1Wrdpk+AQS40Nn8q4ub4XhWdTEuebpJHPEp\n' +
      't4U6LYUCgYEAvi38SUMij1zrNMVoslx5VojF961KCY+RNJvv9HmwV/W2XwjF0VGX\n' +
      'luDSMT5bBXHf1kQfB+DJGo2M6it2IOEZQjd9AJdW1baLGwm56AyQNko7HtEczH0n\n' +
      '42EADs/ajTEckTxULdirbEk2rINRwQC5kWMde3fcwAnn6xt3wvOyuwg=\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'us-cert': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiJF0clHYEFiH4n+OUJi5\n' +
      'YiFiNjFF+oh6OQdZMydE6obpu9UpAzhzRzPYdorrvnM74bOHt4w7N/hEoEb2b9JT\n' +
      'eHDpjXLZj84pK1ATLPzSVpcdTspL38awPnIzxHGbLH8VZp7PyLczDU3VFw2KeT9j\n' +
      '6l9LcOX6HglQht1WjdczEHXOvG9vxphx+xwEZFDTsWRcY/0ABLrfalHvWje45M+o\n' +
      '7dyX3oPYHMENdKQD32USr4OaTcdRSFVrxGzFLkcgKtckYwB7pnYwcKkj+sJ63vbX\n' +
      'Uf7tJ+5r0ybqvhHi1GkqzIfijyOTIbBhgfVD23aWkZnukVBcG1I7s0wqjqxT3RY/\n' +
      'MQIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEowIBAAKCAQEAiJF0clHYEFiH4n+OUJi5YiFiNjFF+oh6OQdZMydE6obpu9Up\n' +
      'AzhzRzPYdorrvnM74bOHt4w7N/hEoEb2b9JTeHDpjXLZj84pK1ATLPzSVpcdTspL\n' +
      '38awPnIzxHGbLH8VZp7PyLczDU3VFw2KeT9j6l9LcOX6HglQht1WjdczEHXOvG9v\n' +
      'xphx+xwEZFDTsWRcY/0ABLrfalHvWje45M+o7dyX3oPYHMENdKQD32USr4OaTcdR\n' +
      'SFVrxGzFLkcgKtckYwB7pnYwcKkj+sJ63vbXUf7tJ+5r0ybqvhHi1GkqzIfijyOT\n' +
      'IbBhgfVD23aWkZnukVBcG1I7s0wqjqxT3RY/MQIDAQABAoIBAGczI3/QASo4/FZY\n' +
      'db7J6i0RdRnmmi78OwAlYW6aWiWv1aivJ9LbMaG4t/a8e/DrO3EPLZuySH2/Cnzj\n' +
      'ow5VLeZxzMuq4mUdMVcdp5/zXS85+lez3yo3Bq/ptNzZzJ0PW6i0kefnKJkBG+nT\n' +
      'vbRqBqLxaBzkbOGNwGBpmiKNYHUqsvDrUED8KmpV5FolriqTN5wOlIziKxQPRDlq\n' +
      'Iect8Vvm5HoDfW5H2HU2BCxwnDM5mC2TAQ6k1UzNgKQVSgFuAPwFsQR85HufaL24\n' +
      'WEY/QPXEqKm/nUjHPZRS8ZXAL/k32y1GB1hYOQ+7Rpui3CyohXjCYuCDHUEDuuH9\n' +
      'KV6DAFECgYEA2wPCIzW2S5/zvsP+TnIJhCNkjXSWG9r3eXqXeskz3Cc0pxmkWeWz\n' +
      '2Tm2hVQ6zgJmAoxL27OGvEzjAgvHU9nbLa70k1+6Ve5QZ4A5UWruriN1lXIAlY8U\n' +
      'wnSFAKzyxuu4cB0y5fxK9KD6Z5O1xDw7HQUBnUidYvFAVkmkSHlpzJcCgYEAn6Fx\n' +
      '+J3N47437l6psURkkn4OcnZjCvISuyMviWKs+sW+tCkYBsF5+IKPaFLw0x6vKS4p\n' +
      '+puJylvriRt60yrAsP2+4XZdBkeFhTlrNif21ngYqXRXNg9HvVQH4U2E9VppZ6AQ\n' +
      'XunOyYgxGrrf0TLguFtoWGAAbp+Cw05GFA38o3cCgYEAgC7p8BuerxJV4X/qllUO\n' +
      'FsV0M4pZ1MHKd9H1WIrsDFzx5x8N3wOeyHOLzOsoY6xpsfIU7+hZ4lmJv4fPSNdH\n' +
      '/avZP2wWrfaGHp2gbnOMcGUWi7omd2I/vzPdKDERArWxxASC5rJL2HNjOz3rc4fg\n' +
      '/TIR6NE4NFGI2zfMrBJLhs8CgYA7In2sEhlxosfpgBvw1VtEgXosoPqz1VVnCfPU\n' +
      'Oz/FbnflGcwSxJ3Al+00QnWAYD+XS8i1U+VJl5+7nPh1PcNATd/megigCOLHpau3\n' +
      '1jo03SyVqcmc9zAmTPjWV/dHRQUDJGKsJoU6Vz+JnWzIfMaOxR30jyvZzzGL1HVV\n' +
      'fJD4pQKBgEcQ2KSjeKKruN8SPkQJJcgOMGN4uxTJTMvE5QZ7A1qrVm+jkMAuH8Ph\n' +
      'rAz9EQX6uBgEzY75zyStGofQ/LfnhBs+35J6NrKBUSosUH+rQEBRxUY2ZUdYZUmn\n' +
      '4gX98w4Dquqpl4ZINv95uI8ROreygmjqLurJHx3NiemZD0R3Cr8v\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'occ': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuEUF6L5iwC1JMHVF/Ybd\n' +
      'pu6yRUrivY8L1c7qvIuvwFGAMDqb6vdmzMyYLAs22yI7BVmwezsHSwvKiLDoDHac\n' +
      'JW6K6qJ9yizeJTjqhcncVBj98+s7ctQtFBqY/KUyvPo7mY7gVZUM2V2Mk8gEzT4E\n' +
      'eQ2VqETD3nidM9wDmNbjAfwQYKasvN6XKVAeBrUJLpfrMaBtnE8f8u0ZVHzRjR2b\n' +
      'T871sOlsGrr0Gv0YoSj0jFZsEx5Ay9UZg/EH+OZMZGWoYL6vTTSvUa0W1GGTTZFo\n' +
      'bZCKjQPg+1a1XDjDNAGhpbm2GlfVnQTrgjrBOZAnsRI2Cd5YROL3u1mQnwBgJgco\n' +
      '7wIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEowIBAAKCAQEAuEUF6L5iwC1JMHVF/Ybdpu6yRUrivY8L1c7qvIuvwFGAMDqb\n' +
      '6vdmzMyYLAs22yI7BVmwezsHSwvKiLDoDHacJW6K6qJ9yizeJTjqhcncVBj98+s7\n' +
      'ctQtFBqY/KUyvPo7mY7gVZUM2V2Mk8gEzT4EeQ2VqETD3nidM9wDmNbjAfwQYKas\n' +
      'vN6XKVAeBrUJLpfrMaBtnE8f8u0ZVHzRjR2bT871sOlsGrr0Gv0YoSj0jFZsEx5A\n' +
      'y9UZg/EH+OZMZGWoYL6vTTSvUa0W1GGTTZFobZCKjQPg+1a1XDjDNAGhpbm2GlfV\n' +
      'nQTrgjrBOZAnsRI2Cd5YROL3u1mQnwBgJgco7wIDAQABAoIBABJ76gHUxzcb09Gm\n' +
      'keTCmI1cOEm3H1OAe+Fwph9Pq8uQ4Vj1KBrDwm4cv877OP92SZFZ09goraybfC+F\n' +
      '/2DwrO0cT5cFwbR8F7SIJw5Ql2dgMmk7WXVFT1hK6rm9IH/QYhYfPOWY0/ch6S4R\n' +
      'zFmCNRSnhjGg5Dz2wF4pXbsBIzhZkuVeoVD7l3BE/6HY5typdH4G2+ZCqTOdSHVj\n' +
      'hb4/VRmURxqM+5vn6V9gNfsauocrsj4KU9WXuEO00HyT82AZ6w9z4Oj9hH6Q6N3k\n' +
      'X4AHL0OG/lSt1FR/Y5GFkBgkmLll/lhCTCWdEuvnix6q2wgoEEkg5ejG/nAhMprp\n' +
      '4YftyyECgYEA6MA3ia788bs6TOiXkFRNoC96WUqmwIj7MYceXDGa4UYPWRoBCBOO\n' +
      'Yldi0dOqwW5c4tMs9iVudqfDpYKi2Qsh1owKTXhtrj+pRLuA+qREXWbrJdNQkHWB\n' +
      'zb7MHu6NM55WRauJNPdpFdqIcBV6YQVtquKKcC5IoWxyf0MayGdIq5cCgYEAyq0R\n' +
      'zpEUBRNB0wghpm5VJtAsZAbyTeEqDlPzZ1j5/YbaJJ45saRwCzXzUkcyH2quKy2K\n' +
      'QgIWCIToI7ZYA23uakWFF+MDYhvZ8SQfPNJ5YsWaprRl8BdntffhPzDx3WawUby+\n' +
      'GcH9At3ifINqDoRE9uWMfJ98OiYbOHOh0U7GeGkCgYEA6FXYGqx++p6218bmZMCC\n' +
      'rIA4VaHbSx5yAUKr38P0oyNYds0qcnFzFF++2U29ilEsj4/VtfAvkGpvNmxtOtON\n' +
      '96jbL/IjKmmKAn5ZhdksFUCDQsLqDQn/hO4MvGPMt9Y6sFlHIYRHdfUrdRc7jlXo\n' +
      '30g8gTbycZDbyoWl2p6fQAkCgYBFdvgJcpQIAUeoSrstzdcFjIgKaI8Xvjqp2oAs\n' +
      'RcS47kVKE6j2h8OXNBCHfLtjJS84wU0HvqtKlDL0OoUD9+OlLNqnCzmXoLAcBCNo\n' +
      't0K/ZbbRuDbQCVWUercK732WQqHgAe6t6V0MZHxB7NCm1RLGBHsYI5lyXKkrugYW\n' +
      'NQe1MQKBgCCVnqeKT+0A9OQ0Sq5loIvXy5/9DI/96gH3xOlg/LDHsemu4fbnrI8Y\n' +
      'Be9h0/LVIc3uQoSkEEYsGefy9w/peRapMCMQFjlRVvfJFJa045c/LxcLiVDOIid0\n' +
      '5emODePPFhu2rOwNmA71ZJqogGJIZ05y31hqnbX3LKVsJYQjGLrS\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'cg': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzOMKHeqaqTasrnLzYDQ+\n' +
      'RqFODRwcWgTlt1euBCB/QBEgq0qiYPonV0JsJj8MZJWAG+xz+4Wgy6a0bJSr3brW\n' +
      '8D/VCxk3RU345m7AMXCNBpaRY/SbY6CaDVDuBIMxIq6WtKHEHKD58XNY/nMPJp+x\n' +
      'mMS4+gZQVv82wV9k0GyX2X60ePhf2XDIVmKdlDT2I/FCUgjQMEwCFh5AxxnzDV+v\n' +
      'q7Y2aZzL9xM3QmUpGp7nF0xj5ACN1w54VZUQ67BKVtWGKQwtU/O63k1F8g8CTMLN\n' +
      'YyaADUF01JIGCeg8xuaxyyRqAU6a1WMDUSM2jdSCMFFesuVvgbORg52RaI6dsrC/\n' +
      'WwIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEowIBAAKCAQEAzOMKHeqaqTasrnLzYDQ+RqFODRwcWgTlt1euBCB/QBEgq0qi\n' +
      'YPonV0JsJj8MZJWAG+xz+4Wgy6a0bJSr3brW8D/VCxk3RU345m7AMXCNBpaRY/Sb\n' +
      'Y6CaDVDuBIMxIq6WtKHEHKD58XNY/nMPJp+xmMS4+gZQVv82wV9k0GyX2X60ePhf\n' +
      '2XDIVmKdlDT2I/FCUgjQMEwCFh5AxxnzDV+vq7Y2aZzL9xM3QmUpGp7nF0xj5ACN\n' +
      '1w54VZUQ67BKVtWGKQwtU/O63k1F8g8CTMLNYyaADUF01JIGCeg8xuaxyyRqAU6a\n' +
      '1WMDUSM2jdSCMFFesuVvgbORg52RaI6dsrC/WwIDAQABAoIBAQCImxgzuihEil+4\n' +
      'MIx0qGCdVw9jTkrY+krvY1ZzCffOD51ol+qMHj38wBy7o23v4n34ID90hDQhlJTX\n' +
      'kIjG3bxRkz3ImJdxbft2KIGcdR6SNfHaY0z3sC0Gk98ewxoPtbhl1zWaoPoFMpMz\n' +
      'lCOV7QPMh92NVohaeO9ZHvFoxf6408CW9N6GeTcq/SDP8jEWUIFJcuCtONg/ndcR\n' +
      'NHgkJ3D0B6PVOsg40ufymuQLNYavW92MqZsmw+tzoDDG7mMXZ0pgVEjetpt4QARF\n' +
      'zZs87SZBjYWkAw48GfLodLpDmLvuWkJPb9N20+dl0LkNO7UkYn+bA8SzA1DjZh6F\n' +
      'iaAK6SYBAoGBAOwDJcQQDVXVWLrr8HUbXdFZ32ArpoC36sYGK8YOdCOD3rWBXbbz\n' +
      'jJdE9Vad1ZWxgHt9OC81D2GWCeMNVZlzIT/cWPiQgmdvZzqJhcpK12RCoQmlIKmc\n' +
      'BI6VBna2lv6X8gV2bI/60nXSib3adW+AxUOQQLVhZ/omSPBM3IPmUJNRAoGBAN49\n' +
      'FDGDsgOWMsetf9WhLEjKfJ47DYXpXf9mN7StvrXlVLEzbs9YS0iv5fzSUEpWsI3k\n' +
      '0bKe0JTgSLFXkCgvSlbwwBaP47iVc5wzSBB7WwjdeeP6Zy2mvb9vBoDV/QZ99sVp\n' +
      'T+MR08YOQM0rzCu2oGyD1KEO6ByfGBAevckQGETrAoGAbeI1Rii3HLx9WGIbjVqV\n' +
      'frBaWRtZpVp7+4DKBqeaGSL/oQA/UrvoPFHF7HMGC3EeQeCWNRx+MdA6gDUoIo7A\n' +
      '70u3PNuDa4cpx85ZtUrNKAgBlE0GfRF/6aam4MS4Xob+Dt8JQqvkKylAKl25CZYp\n' +
      'wgA6sHhOgeArW35duSeVYlECgYAr3PRKXYraCGAXZxgPCxOZflWgSVl+77N8wCkI\n' +
      'gS5d6liP7O3XAL9DJmyHPN9Z/Mg2CU6WKaBTcf0G+5hZRhQvGq9fBKFWgjDiSIDV\n' +
      't/McydHP/FE3Amz7BqfK7/FTwbLd/c4lrBQXSCLkG9vdWNtK764c57tKQuBV9itR\n' +
      'LtsLZwKBgBB3OvSIFFyIj4RFQdXTmQtzixbdxjzMHltF+n7QSLTv+uv6QxHG+8+I\n' +
      'pgQskpEa6QA8iD55JMGbA5u8rt0BmsEN5igzCIbcE3yZmKGOUUdF1LsYP8GJil6s\n' +
      '1CygxFHQtKgKcbC6moBZvrnyrjK7n9UCdpdpjj7a8zCWBTVIrB64\n' +
      '-----END RSA PRIVATE KEY-----'
  },
  'ss': {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtrYi0DBUut47nPrn6l6z\n' +
      'AMI2GRjMcl8ULZ51FCi/lVaC3uY17PFu2TxKLceVhwrkWSPkjqbccGUz67a7MYdc\n' +
      'bL5ABB/ACvqscC1SKs7q+6KunyMheIckaTl5kJccjfjnlYMTKNm5mDDPRzbOYDWJ\n' +
      'VUSxBn69Mj+guMeJq851q2is2BWh2lIW/3YI3pRc0dyw9nZCZToo69a2ErbuL26h\n' +
      'Y6cXUW+W+DyizkBjBT/wm61CC35PEUavM6ICLWJkOPREEYaY8z9aR3p2ByhGejvG\n' +
      'ZupV9yB4yxuo9ZRSU8H8aucD7Ex4+UNO+SDh5RO3L7AKaq8XYqYXMnP13E5SMTQK\n' +
      'rQIDAQAB\n' +
      '-----END PUBLIC KEY-----',
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIEpAIBAAKCAQEAtrYi0DBUut47nPrn6l6zAMI2GRjMcl8ULZ51FCi/lVaC3uY1\n' +
      '7PFu2TxKLceVhwrkWSPkjqbccGUz67a7MYdcbL5ABB/ACvqscC1SKs7q+6KunyMh\n' +
      'eIckaTl5kJccjfjnlYMTKNm5mDDPRzbOYDWJVUSxBn69Mj+guMeJq851q2is2BWh\n' +
      '2lIW/3YI3pRc0dyw9nZCZToo69a2ErbuL26hY6cXUW+W+DyizkBjBT/wm61CC35P\n' +
      'EUavM6ICLWJkOPREEYaY8z9aR3p2ByhGejvGZupV9yB4yxuo9ZRSU8H8aucD7Ex4\n' +
      '+UNO+SDh5RO3L7AKaq8XYqYXMnP13E5SMTQKrQIDAQABAoIBAD2BEDT+n/cLigus\n' +
      '1laprB4MQkOuelvhr5wvo/+2O8+cgI9h9TMejo7n4ZyJe8cqnnV3RJ/UgY4AMzsc\n' +
      'luT0SON+I3R/75iCi3tzdh5c6vLr71Y4cDLvYw1cwJQwmfccm3BT4CY3LGeTvqKd\n' +
      'S1lNjD480k56aVu52XN6D9jatfeNwk3iQnmHmFd0P0+Lo7iqE8HOCokC27fhb8ts\n' +
      'C+rT/MIDGc6KHOcsrQxyb/APwuOHyynxrmhOWpeO2d1PBZZqdzsZd7aM6WxuYURn\n' +
      'Zo7zi1GdDohYIx4KN75Hnh1lK/DTKM2XgXvE25YAFnmDKr5fRjcnVShdbwVKoMQo\n' +
      'V4HGuG0CgYEA2SFMFDg1gW+Uhml9Un213TsIVGn8G7hu8Ae0tKTMjO+13S1wlUY0\n' +
      'GFTxKO4mpVe400eVw+eXrXwXJ9kUoxHYUuXPwV2vj4hFRv7QnLTjwXGa8ryiGYsJ\n' +
      'utDfMhbb39JeLzEDuXYRURZb9n6AkN4IYGqQAbFqKcC4lsU+gueKjW8CgYEA12t+\n' +
      'KBxTfypWYMvJFI9hvJVJ7fIsyaTtZkxpZ8A47XODu2pabk6r7OA+nepPZK/UvsSA\n' +
      'ggrF2E15l69COJzhItp0HsaVBpjqjJCaSIMYJZNmtdh9DjFmAU7HthUmtVSIZPOJ\n' +
      'pkIyPi+vgRlvL3H47tfZOVIYmZKHiOz43EtvU6MCgYEAuyt21580kGVNFSjuPSPc\n' +
      'l96BabMK/iJYj1U1Mts08PDaRtUazbL8yVS/plbUvYcG7ioxMfT7zTLBCzqYDZIe\n' +
      'didglgFai1Ie1fpmfg94nZJ+zWxKF9bBBmdzX0xRMXm4ctm/qina95lcoPmffkHH\n' +
      '2sVBahQzvdZByMYzAsjxqMUCgYBYskG3cjJO4be/Eykv9flgFHfkKRqXy/iTblLY\n' +
      'DSVjX3SV7ixdzrarSYl+q8MUyfDmuzHOWXEspnmyIs85UB7Cov+8zDcACGZKih98\n' +
      'S73detuHdCPJfD1rvGwuZHcTokKmjj/W3NqjEC9LEJXfCyZb8TPXjh3i3ZpAnpG4\n' +
      '4rZr0QKBgQAJOsAT8uqZk7QBk2Sn4M/ag8e30klqbGH0f6k4PmDBCfnDRvOHxGZK\n' +
      'fjLWq+qY+9avCjRkqNWV3nCGzKSyBzE0zYA95y9LlMZxID8VSyiB+Ne9rHakz3Zt\n' +
      'eF0E/T7R/1rnHb6HDsJrczCM2+ZQ/NT893Rh4HD3A0TF/qXyKQ5ULw==\n' +
      '-----END RSA PRIVATE KEY-----'
  }
};

// create identities for all agencies
_.forEach(Object.keys(agencies), function(value) {
  var identity = helpers.createIdentity(value);
  identity.sysResourceRole.push({
    sysRole: 'identity.registered',
    generateResource: 'id'
  });
  var keyPair = helpers.createKeyPair({
    userId: identity.id,
    publicKey: agencies[value].publicKey,
    privateKey: agencies[value].privateKey,
  });

  agencies[value].identity = identity;
  agencies[value].keys = keyPair;
  identities.push(agencies[value]);
});
